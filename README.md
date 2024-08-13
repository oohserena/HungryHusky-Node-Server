# Node.js Server for Hungry Husky Restaurant Review App 


## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)


## Project Overview
This Node.js server provides a RESTful API for managing user interactions with restaurant data. It integrates with the Yelp API to allow users to search for restaurants, view reviews, add restaurants to their favorites list, and leave reviews. The server also offers analytics on user ratings in Yelp.

## Features
- Restaurant Search: Search for restaurants using the external Yelp API.
- View Reviews: Get restaurant reviews and rating breakdown from Yelp.
- Add to Favorites: Add a restaurant to the user's favorites list.
- Leave a Review: Submit a review for a restaurant.
- Retrieve Favorites: View all favorite restaurants for a user.
- Analytics: Get counts of ratings in Yelp to give deep information to Business Analystics(one of the user roles).

## Installation
- Clone the repo
```sh
git clone https://github.com/your-username/your-repo.git
```

- Navigate to the Project Directory
```sh
cd your repo
```

- Install Dependencies
```sh
npm install
```

- Set up Environment Variables
```sh
PORT=4000
DATABASE_URL=mongodb://localhost:27017/your-database
YELP_API_KEY=your-yelp-api-key
```

## Usage
```sh
node app.js
```

## API Endpoints
### User
#### GET /api/users  
get all users data

#### GET /api/users/:userId
Retrieve details for a specific user by their ID
- Path parameter: userId

#### PUT /api/users/:userId
Update user
- Path parameter: user Id

#### POST /api/users/register
Register a new user
- Request body: {"username": "string", "password": "string", "firstName": "string, "lastName": "string", "email": "string", "dob": "string", "role", "stirng"}

#### POST /api/users/login
User login
- Request body: {"email": "string", "password": "string"}

#### POST /api/users/logout
Logs the user out by destroying their session.


#### POST /api/users/profile
Retrieve the currently authenticated user's account information

#### DELETE /api/users/:userId
Delete a user by their ID
- Path parameter: userId

### Search

#### GET /api/businesses/search
Search for restaurants using the Yelp API
- Query Parameters

 `term` (string, required): The search term (e.g., "sushi", "burgers") to find specific types of restaurants.

`location` (string, required): The location (e.g., "Seattle, WA", "San Francisco, CA") where the search should be performed.

- Example Request
```http
GET /api/restaurants/search?term=pizza&location=Seattle,WA
```

#### GET /api/businesses/:id
Retrieve detailed information about a specific restaurant using the Yelp API

- Path Parameter

`id` (string, required): The unique identifier of the restaurant for which details are being requested.

### Reviews

#### POST /api/reviews
create a review for a restaurant

- Request body

`user_id` (string, required): The unique identifier of the user creating the review

`restaurant_id` (string, required): The unique identifier of the restaurant being reviewed

`content` (string, required): The content of the review provided by the user.

#### DELETE /api/reviews/:id
Delete a review by its ID.

- Path Parameters

`reviewId` (string, required): The unique identifier of the review to be deleted

#### GET /api/reviews
Retrieve all reviews

#### GET /api/users/:userId/review
Retrieve all reviews made by a specific user

- Path parameter
`userId` (string): The unique identifier of the user whose reviews are being requested.

#### GET /api/restaurants/:restaurantId/totalReviews
Retrieve the total number of reviews for a specific restaurant

- Path parameter

`restaurantId` (string): The unique identifier of the restaurant whose review count is being requested.

### Rating

#### GET /api/businesses/:id/reviews
Retrieve reviews and rating counts for a specific restaurant

- Path parameter

`id` (string): The unique identifier of the restaurant for which reviews are being requested.

### Favaorites

#### POST /api/favorites
Adds a restaurant to a user's favorite list. This endpoint allows users to mark a restaurant as a favorite by adding it to their list of favorite restaurants

- Request body

`user_id` (String, required): The unique identifier of the user

`restaurant_id` (String, required): The unique identifier of the restaurant to be added to the favorites list

#### DELETE /api/favorites/:id
Delete the restaurant from the user's favorite list

- Path parameter

`restaurant_id` (string, required): The unique identifier of the restaurant being reviewed

#### GET /api/users/:userId/favorites
Retrieves all favorite restaurants for a specific user. This endpoint allows users to view the list of restaurants they have marked as favorites

- Path parameter

`userId` (String, required): The unique identifier of the user whose favorite restaurants are to be retrieved.

#### GET /api/restaurants/:restaurantId/favorites
Retrieves all users who have marked a specific restaurant as a favorite. This endpoint allows you to see the list of users who have added a particular restaurant to their favorites

- Path parameter

`restaurantId` (String, required): The unique identifier of the restaurant for which favorite records are to be retrieved


#### GET /api/restaurants/:restaurantId/foodieFavoritesCount
Retrieves the count of users with the role of "FOODIE" who have marked a specific restaurant as a favorite. This endpoint is used to determine how popular a restaurant is among users identified as "FOODIE"

- Path parameter

`restaurantId` (String, required): The unique identifier of the restaurant for which favorite records are to be retrieved

#### GET /api/restaurants/:restaurantId/analyticsFavoritesCount

Retrieves the count of users with the role of "BUSINESS ANALYST" who have marked a specific restaurant as a favorite. This endpoint is useful for understanding how popular a restaurant is among users with a focus on business and analytical insights

- Path parameter

`restaurantId` (String, required): The unique identifier of the restaurant for which favorite records are to be retrieved

## Architecture

There are 3 collections in the database: user, review, favarites, and we use Yelp API to interact with Yelp database for search and rating feature

The archetectures:

`schema.js`: Defines the Mongoose schema for the favorites collection

`model.js`: Creates and exports the Mongoose model based on the schema

`dao.js`: Contains data access functions for interacting with the favorites collection

`routes.js`: Defines API routes for favorites and reviews, integrating with external Yelp API for restaurant searches

## Environment Variables

`DB_CONNECTION_STRING`: MongoDB connection string

`NODE_ENV`: Define the environment

`YELP_API_KEY`: To interact with Yelp API

`FRONTEND_URL`: connect with frontend