import model from "./model.js";

export const findAllReviews = () => model.find();
export const findReviewById = (id) => model.findById(id);
export const findReviewsByUserId = (userId) => {
    return model.find({ user_id: userId })
        .then(reviews => reviews)
        .catch(error => {
            console.error('Error finding reviews by user ID:', error);
            throw error; 
        });
};
export const findReviewsByRestaurantId = (restaurantId) => model.find({ restaurant_id: restaurantId });
export const createReview = (reviewData) => model.create(reviewData);
export const deleteReview = (id) => model.deleteOne({ _id: id });