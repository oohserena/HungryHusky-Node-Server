import * as favoriteDao from "./dao.js";
import mongoose from 'mongoose';
import * as userDao from "../users/dao.js";

function FavoritesRoutes(app) {
    const createFavorite = async (req, res) => {
        try {
            const newFavorite = await favoriteDao.createFavorite({
                user_id: req.body.user_id,
                restaurant_id: req.body.restaurant_id
            });
            console.log(newFavorite._id)
            console.log(req.body.user_id)
            await userDao.addToUserFavorites(req.body.user_id, newFavorite._id);
            res.status(201).json(newFavorite);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    const deleteFavorite = async (req, res) => {
        try {
            const { id } = req.params; // ID of the favorite to delete

            // Find the favorite to get the user_id
            const favorite = await favoriteDao.findFavoriteByUserId(id);
            if (!favorite) {
                return res.status(404).json({
                    message: "Favorite not found"
                });
            }

            // Remove favorite ID from the user's favorite_ids array
            await favoriteDao.removeFromUserFavorites(favorite.user_id, id);

            // Delete the favorite itself
            await favoriteDao.deleteFavorite(id);

            res.status(200).json({
                message: "Favorite successfully deleted"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    app.post("/api/favorites", createFavorite);
    app.delete("/api/favorites/:id", deleteFavorite);
}

export default FavoritesRoutes;