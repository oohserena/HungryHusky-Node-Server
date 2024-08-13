import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import UserRoutes from "./users/routes.js";
import SearchRoutes from "./search/routes.js";
import FavoritesRoutes from "./favorites/routes.js";
import ReviewRoutes from "./reviews/routes.js";
import RatingRoutes from "./rating/routes.js";

console.log('Server is starting...');
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const CONNECTION_STRING = "mongodb://127.0.0.1:27017";
// process.env.DB_CONNECTION_STRING;
//  || "mongodb://127.0.0.1:27017";
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
SearchRoutes(app);
FavoritesRoutes(app);
ReviewRoutes(app);
RatingRoutes(app);

try {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
} catch (error) {
  console.error('Error starting the server:', error);
}