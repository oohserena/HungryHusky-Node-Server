import mongoose from "mongoose";
import schema from './schema.js';

const model = mongoose.model("favorites", schema);
export default model;