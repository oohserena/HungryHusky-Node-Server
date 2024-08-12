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
            const { id } = req.params;
            console.log(id)
            const deletedFavorite = await favoriteDao.findFavoriteById(id);
            if (!deletedFavorite) {
                return res.status(404).json({
                    message: "Favorite not found"
                });
            }
            // console.log(deletedFavorite)
            await userDao.removeFromUserFavorites(deletedFavorite.user_id, id);
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

    const findFavoritesByUserId = async (req, res) => {
        try {
            const userId = req.params.userId;
            const favorites = await favoriteDao.findFavoriteByUserId(userId);
            res.json(favorites);

        } catch (error) {
            console.error(error);
            res.status(500).send({message: error.message});
        }
    }

    const findFavoriteByRestaurantId = async (req, res) => {
        try{
            const resaurantId = req.params.restaurantId;
            const favorites = await favoriteDao.findFavoriteByRestaurantId(resaurantId);
            res.json(favorites);   
        }  catch (error) {
            console.error(error);
            res.status(500).send({message: error.message});
        }
    } 

    const findFoodieFavoritesCount = async (req, res) => {
        try {
            const restaurantId = req.params.restaurantId;
            const favorites = await favoriteDao.findFavoriteByRestaurantId(restaurantId);
    
            let foodieFavoritesCount = 0;
    
            for (const favorite of favorites) {
                const userId = favorite.user_id;
                const userInfo = await userDao.findUserById(userId);
    
                if (userInfo && userInfo.role === "FOODIE") {
                    foodieFavoritesCount += 1;
                }
            }
    
            // Send the count of foodie favorites in the response
            res.json({ foodieFavoritesCount: foodieFavoritesCount });
    
        } catch (error) {
            res.status(500).send("Server Error: " + error.message);
        }
    }

    const findAnalyticsFavoritesCount = async (req, res) => {
        try {
            const restaurantId = req.params.restaurantId;
            const favorites = await favoriteDao.findFavoriteByRestaurantId(restaurantId);
    
            let analyticsFavoritesCount = 0;
    
            for (const favorite of favorites) {
                const userId = favorite.user_id;
                const userInfo = await userDao.findUserById(userId);
    
                if (userInfo && userInfo.role === "BUSINESS ANALYST") {
                    analyticsFavoritesCount += 1;
                }
            }
    
            // Send the count of foodie favorites in the response
            res.json({ analyticsFavoritesCount: analyticsFavoritesCount });
    
        } catch (error) {
            res.status(500).send("Server Error: " + error.message);
        }
    }
    
    app.post("/api/favorites", createFavorite);
    app.delete("/api/favorites/:id", deleteFavorite);
    app.get("/api/users/:userId/favorites", findFavoritesByUserId);
    app.get("/api/restaurants/:restaurantId/favorites", findFavoriteByRestaurantId);
    app.get("/api/restaurants/:restaurantId/foodieFavoritesCount", findFoodieFavoritesCount);
    app.get("/api/restaurants/:restaurantId/analyticsFavoritesCount", findAnalyticsFavoritesCount);

}

export default FavoritesRoutes;