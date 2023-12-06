import model from "./model.js";
import mongoose from "mongoose";

export const findAllUsers = () => model.find();

// export const findUserById = (userId) => model.findById(userId);
// export const updateUser = (userId, user) =>
//   model.updateOne({ _id: userId }, { $set: user });
export const findUserById = (id) => model.findById(id);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (email, password) =>
  model.findOne({ email, password });
export const findUserByEmail = (email) => model.findOne({ email: email });
export const findUsersByRole = (role) => model.find({ role: role });
export const createUser = (user) => model.create(user);
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => model.deleteOne({ _id: id });
export const addToUserReviews = (userId, reviewId) => {
  return model.updateOne(
    { _id: userId },
    { $push: { review_ids: new mongoose.Types.ObjectId(reviewId) } }
  );
};
export const removeFromUserReviews = (userId, reviewId) => {
  return model.updateOne({ _id: userId }, { $pull: { review_ids: reviewId } });
};
export const addToUserFavorites = (userId, favoritedId) => {
  return model.updateOne(
    { _id: userId },
    { $push: { favorite_ids: new mongoose.Types.ObjectId(favoritedId) } }
  );
};
export const removeFromUserFavorites = (userId, favoriteId) => {
  return model.updateOne(
    { _id: userId },
    { $pull: { favorite_ids: favoriteId } }
  );
};
