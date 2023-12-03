import model from "./model.js";

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
