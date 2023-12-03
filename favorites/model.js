import mongoose from "mongoose";
import schema from './schema.js';

const favoriteModel = mongoose.model("favorites", schema);
export default favoriteModel;