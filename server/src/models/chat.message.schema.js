import mongoose from "mongoose";

// chat message model schema here
const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CharacterProfile",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const chatMessage = mongoose.model("chatMessage", chatMessageSchema);
