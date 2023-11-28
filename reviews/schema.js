import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
    restaurant_id: { type: string },
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "reviews" }
);
