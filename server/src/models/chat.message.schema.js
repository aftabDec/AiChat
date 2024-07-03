import mongoose, { model } from "mongoose";

// chat message model schema here
const chatMessageSchema = new model({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
export const chatMessage = mongoose.model("chatMessage", chatMessageSchema);
