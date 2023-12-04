import * as reviewDao from "./dao.js";
import * as userDao from "../users/dao.js";
import mongoose from "mongoose";

function ReviewRoutes(app) {
  const createReview = async (req, res) => {
    try {
      const newReview = await reviewDao.createReview({
        user_id: req.body.user_id,
        restaurant_id: req.body.restaurant_id,
        content: req.body.content,
      });

      await userDao.addToUserReviews(req.body.user_id, newReview._id);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteReviewById = async (req, res) => {
    try {
      const { reviewId } = req.params;

      const deletedReview = await reviewDao.findReviewById(reviewId);
      if (!deletedReview) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      await userDao.removeFromUserReviews(deletedReview.user_id, reviewId);
      await reviewDao.deleteReview(reviewId);

      res.status(200).json({
        message: "Review successfully deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const findAllReviews = async (req, res) => {
    const reviews = await reviewDao.findAllReviews();
    res.json(reviews);
  };

  const findReviewsByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;

      const reviews = await reviewDao.findReviewsByUserId(userId);
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  };

  app.post("/api/reviews", createReview);
  app.delete("/api/reviews/:reviewId", deleteReviewById);
  app.get("/api/reviews", findAllReviews);
  app.get("/api/users/:userId/review", findReviewsByUserId);
}

export default ReviewRoutes;
