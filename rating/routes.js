import expres from 'express';
import axios from 'axios';
import mongoose from 'mongoose';

function RatingRoutes(app) {
    const YELP_API_KEY = process.env.YELP_API_KEY;

    const findReviewsByRestaurantId = async (req, res) => {
        const { id: restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant Id is required." });
        }

        try {
            const response = await axios.get(`https://api.yelp.com/v3/businesses/${restaurantId}/reviews`
            , {
                headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                },
            
            });

            const ratingCounts = {
                ratingFiveCount: response.data.reviews.filter(review => review.rating === 5).length,
                ratingFourCount: response.data.reviews.filter(review => review.rating === 4).length,
                ratingThreeCount: response.data.reviews.filter(review => review.rating === 3).length,
                ratingTwoCount: response.data.reviews.filter(review => review.rating === 2).length,
                ratingOneCount: response.data.reviews.filter(review => review.rating === 1).length,
            };
    
            // Send back the original response data along with the counts of each rating
            res.json({ ...response.data, ...ratingCounts });
        } catch (error) {
            console.error('Error calling Yelp API:', error.response || error);
            return res.status(500).json({ message: "Error while fetching data from Yelp API", error: error.response?.data || error.message });
        }
    };

    app.get("/api/businesses/:id/reviews", findReviewsByRestaurantId);
}

export default RatingRoutes;