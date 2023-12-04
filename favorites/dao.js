import { removeFromUserFavorites } from "../users/dao.js";
import favoriteModel from "./model.js";


export const createFavorite = (favoriteData) => favoriteModel.create(favoriteData);
export const deleteFavorite = (id) => favoriteModel.deleteOne({ _id: id });
export const findFavoriteByUserId = (userId) => {
    return favoriteModel.find({ user_id: userId })
        .then(favorites => favorites)
        .catch(error => {
            console.error('Error finding reviews by user ID:', error);
            throw error; 
        });
};

