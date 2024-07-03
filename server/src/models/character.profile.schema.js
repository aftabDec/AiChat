import mongoose, { Schema } from "mongoose";

// fictional character model schema here
const characterProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    personality: {
      type: String,
      required: true,
    },
    greetings: {
      type: String,
    },
    tagline: {
      type: String,
    },
    avatar: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    chats: {
      type: Number,
      default: 0,
    },
    catchphrases: [String],
  },
  { timestamps: true }
);

export const characterProfile = mongoose.model(
  "CharacterProfile",
  characterProfileSchema
);
