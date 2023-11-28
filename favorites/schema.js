import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
    restaurant_id: { type: string },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "favorites" }
);
