# Auth-with-JWT
Securing your API with JWT

## Getting started
- `git clone` this repo
- `cd` into the repo
- Run `npm install` to install dependencies
- Start the server by running `npm start`
- Open the client folder in the root directory
- The dashboard page updates user info in the database, but the update user route in the API is protected with JWT
- Open the login.html and log in to generate your token, which is only valid for 50s (just for demo purposes, you can 
extend the duration if you want).
- Then you can access the update user info route.
- Thats all.

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- Json web tokens (JWT)
