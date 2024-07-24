import { GoogleGenerativeAI } from "@google/generative-ai";
import { characterProfile } from "../models/character.profile.schema.js";
import { chatMessage } from "../models/chat.message.schema.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Initialize Google Generative AI
const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyCOxdGRuJAPfdMMx57tf4t6JNgD1sE-lzQ";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
{
  /*handle chat controller*/
}
const handleChat = asyncHandler(async (req, res) => {
  const { userId, message, characterId } = req.body;
  try {
    // Find the character profile
    const character = await characterProfile.findById(characterId);
    if (!character) {
      throw new ApiError(400, "Character not found");
    }

    // Create the prompt including character details
    const prompt = `
  You are now ${character.name}.
  Here is your description: ${character.description}.
  Here is your personality: ${character.personality}.
  ${character.greetings ? `When the conversation starts, greet the user with: "${character.greetings}".` : ""}
  ${character.tagline ? `Occasionally use your tagline: "${character.tagline}".` : ""}
  
  Respond to the user based on your persona and traits.
  
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
export { handleChat, deleteChat };
