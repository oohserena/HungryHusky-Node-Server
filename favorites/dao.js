import favoriteModel from "./model.js";


export const createFavorite = (favoriteData) => favoriteModel.create(favoriteData);
export const deleteFavorite = (id) => favoriteModel.deleteOne({ _id: id });
export const findFavoriteByUserId = (userId) => favoriteModel.find({
    user_id: userId
});
