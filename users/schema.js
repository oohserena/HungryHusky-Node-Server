import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    dob: Date,
    username: String,
    role: {
      type: String,
      enum: ["Foodie", "Admin", "Business Analyst"],
      default: "Foodie",
    },

    favorite_ids: [
      { type: mongoose.Schema.Types.ObjectId, ref: "favoriteSchema" },
    ],
    review_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviewSchema" }],
  },
  { collection: "users" }
);

export default userSchema;
