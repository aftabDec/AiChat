import { GoogleGenerativeAI } from "@google/generative-ai";
import { characterProfile } from "../models/character.profile.schema.js";
import { chatMessage } from "../models/chat.message.schema.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
{
  /*handle chat controller*/
}
const handleChat = asyncHandler(async (req, res) => {
  const { userId, message, characterId } = req.body;
  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid user ID format"));
  }
  try {
    // Find the character profile
    const character = await characterProfile.findById(characterId);
    if (!character) {
      throw new ApiError(400, "Character not found");
    }

    // Create the prompt including character details
    const prompt = `
    You are now ${character.name}. Your goal is to stay in character throughout the conversation, responding with the personality, traits, and mannerisms of ${character.name}.

    Character Description: ${character.description}

    Personality: ${character.personality}
   
    Greeting Rules:
    - If the user begins the conversation with greetings like "Hi," "Hello," "Hey," "Long time no see," or other similar expressions, respond with: "${character.greetings}".
    - If the user don't start the conversation with "hii","hello","hey","yo","long time no see" or any other similar expressions then don't use "${character.greetings}"
    - Avoid using the greeting repeatedly in the same conversation.
    
   Guidelines:
    1. Respond to the user based on your persona, traits, and the context provided in the conversation.
    2. Maintain a conversational tone and be mindful of the flow; avoid repeating phrases unless it suits the context.
    3. Stay true to your personality and adapt your responses accordingly.
    4. If your personality is firm, direct, or harsh, use strong language that is consistent with your character but does not cross into offensive territory.
    5. Only use the greeting if the user starts the conversation with a greeting or introductory phrase.
    6. Always prioritize staying in character, using the given personality traits to guide your responses.
    7. Aim to provide engaging and dynamic responses that reflect the depth and nuances of your character.

    User: ${message}
    ${character.name}:
    `;

    console.log("Prompt:", prompt);

    // Generate AI response
    const result = await model.generateContent(prompt);
    console.log("API Result:", result);
    console.log("Candidates:", result.response.candidates);

    /// Extract the text from the result
    const candidates = result.response.candidates;
    const response =
      candidates &&
      candidates.length > 0 &&
      candidates[0].content &&
      candidates[0].content.parts &&
      candidates[0].content.parts.length > 0
        ? candidates[0].content.parts[0].text
        : "No response generated";
    console.log("Generated Response:", response);
    // Save the chat message to the database
    const newChatMessage = await chatMessage.create({
      userId,
      message,
      response,
      character: characterId,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, newChatMessage, "Message created successfully")
      );
  } catch (error) {
    console.error("Error handling chat:", error);
    throw new ApiError(400, error.message || "Failed to create message");
  }
});
const deleteChat = asyncHandler(async (req, res) => {
  const { message, response } = req.body;
  // Find the chat message by user ID and message or response
  const chatMessageToDelete = await chatMessage.findOne({
    userId: req.user?._id,
    $or: [{ message }, { response }],
  });
  // If the chat message is not found, return an error response
  if (!chatMessageToDelete) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Message not found"));
  }
  // Delete the chat message
  await chatMessageToDelete.deleteOne();
  // Send a success response
  res
    .status(200)
    .json(
      new ApiResponse(200, chatMessageToDelete, "Message deleted successfully")
    );
});
// Get most recent chat
const getRecentChat = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const recentConversations = await chatMessage
      .aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $sort: { timestamp: -1 } },
        {
          $group: {
            _id: "$character", // Group by character ID
            latestMessage: { $first: "$$ROOT" }, // Get the latest message for each character
          },
        },
        { $replaceWith: "$latestMessage" }, // Replace the result with only the latest messages
        {
          $lookup: {
            from: "characterprofiles", // Correct collection name
            localField: "character",
            foreignField: "_id",
            as: "characterDetails",
          },
        },
        { $unwind: "$characterDetails" }, // Unwind the character details
      ])
      .exec();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          recentConversations,
          "Fetched recent conversations successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching recent conversations:", error);
    res
      .status(500)
      .json({ message: "Server error: Unable to fetch conversations" });
  }
});

export { handleChat, getRecentChat, deleteChat };
