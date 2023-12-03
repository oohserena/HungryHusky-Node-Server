import { Cookie } from "express-session";
import * as reviewDao from "./dao.js";
import * as userDao from "../users/dao.js";

function ReviewRoutes(app) {
    const createReview = async (req, res) => {
        try {
            const newReview = await reviewDao.createReview(req.body);
            await userDao.updateOne(
                { _id: mongoose.Types.ObjectId(req.body.user_id) },
                { $push: { review_ids: newReview._id } }

            );
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const findAllReviews = async (req, res) => {
        const reviews = await reviewDao.findAllReviews();
        res.json(reviews);
    }

    const findReviewsByUserId = async (req, res) => {
        const { userId } = req.params;
        console.log(userId)
        const reviews = await reviewDao.findReviewsByUserId(userId);
        res.json(reviews);
    };


    app.post("/api/reviews", createReview);
    app.get("/api/reviews", findAllReviews);
    app.get("/api/users/:userId/review", findReviewsByUserId);


}

export default ReviewRoutes;