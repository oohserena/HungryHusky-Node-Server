import { removeFromUserFavorites } from "../users/dao.js";
import favoriteModel from "./model.js";


export const createFavorite = (favoriteData) => favoriteModel.create(favoriteData);
export const deleteFavorite = (id) => favoriteModel.deleteOne({ _id: id });
export const findFavoriteById = (id) => favoriteModel.findById(id); 
export const findFavoriteByUserId = (userId) => {
    return favoriteModel.find({ user_id: userId })
        .then(favorites => favorites)
        .catch(error => {
            console.error('Error finding reviews by user ID:', error);
            throw error; 
        });
};
export const findFavoriteByRestaurantId = (restaurantId) => {
    return favoriteModel.find({ restaurant_id: restaurantId})
        .then(favorites => favorites)
        .catch(error => {
            console.error('Error finding reviews by user ID:', error);
            throw error; 
        });
};




