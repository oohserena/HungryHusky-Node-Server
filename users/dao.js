import model from "./model.js";

export const findAllUsers = () => model.find();
// export const findUserById = (userId) => model.findById(userId);
// export const updateUser = (userId, user) =>
//   model.updateOne({ _id: userId }, { $set: user });
