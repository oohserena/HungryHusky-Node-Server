import express from "express";
import axios from "axios";
import mongoose from "mongoose";

function SearchRoutes(app) {
  const YELP_API_KEY = process.env.YELP_API_KEY; // Make sure to set your Yelp API key in your environment variables

  const searchRestaurants = async (req, res) => {
    const { term, location } = req.query;

    if (!term || !location) {
      return res
        .status(400)
        .json({ message: "Both term and location are required." });
    }

    try {
      const response = await axios.get(
        "https://api.yelp.com/v3/businesses/search",
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
          params: {
            term,
            location,
            categories: "ailas",
            limit: 8,
          },
        }
      );
      res.json(response.data.businesses); // Sending back only the list of businesses
    } catch (error) {
      console.error("Error calling Yelp API:", error);
      res
        .status(500)
        .json({ message: "Error while fetching data from Yelp API" });
    }
  };

  const RestaurantDetail = async (req, res) => {
    const { id: restaurantId } = req.params;
    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant Id is required." });
    }

    try {
      const response = await axios.get(
        `https://api.yelp.com/v3/businesses/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error calling Yelp API:", error.response || error);
      return res
        .status(500)
        .json({
          message: "Error while fetching data from Yelp API",
          error: error.response?.data || error.message,
        });
    }
  };

  app.get("/api/businesses/search", searchRestaurants);
  app.get("/api/businesses/:id", RestaurantDetail);
}

export default SearchRoutes;
