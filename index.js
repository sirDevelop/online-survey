/*
on the server side of our application we do not have access to ES2015 modules 
So we cannot just use
import express from 'express'
But on the front end, we do have access, so using this is acceptable.
On server side, we use const express = require('express')
*/

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

// telling passport that we can use this strategy to authenticate users
// new GoogleStrategy(Client ID, Client Secret)
// Client ID is a public token that can be shared with the public. Simply identifies the application with Google Servers
// Client Secret is a private token. So it CANNOT be pushed to Github or else anyone who views the Github will have elevated privileges inside our application. So how can we store this client secret?

// the last option in this object
// is if a user grants permission, the callbackURL appends to the URL to redirect the user to a page on Google to get more information about the user

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClienSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

// a route handler that ensures the user gets kicked into the passport flow
// a user clicks login and then a route handler moves them into passport js
// (route, action (in code))

// authenticate('google') works because internally, GoogleStrategy is linked to a string called 'Google' and thats why we can authenticate with a string called Google
// with scope, we ask Google to grant us access to a user's profile and email information (also set strings). There are more such as images, etc.
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// second argument is an arrow function. All counts as one argument
// app.get("/", (req, res) => {
//   res.send({ bye: "buddy" });
//   // send JSON back to whoever made this request
// });
// app is express app to register this route handler with
// get - get info, post - send info, put - update all the properties of something, delete - delete something, patch - update one or two properties of something
// '/' indicates to watch for requests trying to access '/' as URL path
// req (short for request) is the object representing the incoming request
// res (short for response) is the object representing the outgoing response

// Heroku can inject environment variables. Environment Variables, variables which live in the underlying runtime that Node is running on top of
// If there is a production environment then use HEROKU PORT if not use 5000
const PORT = process.env.PORT || 5000;

// express is telling Node to listen on port 5000
app.listen(PORT);
