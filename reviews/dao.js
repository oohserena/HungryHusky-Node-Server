import model from "./model.js";

export const findAllReviews = () => model.find();
export const findReviewById = (id) => model.findById(id);
export const findReviewsByUserId = (userId) => model.find({ user_id: userId});
export const findReviewsByRestaurantId = (restaurantId) => model.find({ restaurant_id: restaurantId });
export const createReview = (review) => model.create(review);
export const deleteReview = (id) => model.deleteOne({ _id: id });