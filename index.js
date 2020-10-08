/*
on the server side of our application we do not have access to ES2015 modules 
So we cannot just use
import express from 'express'
But on the front end, we do have access, so using this is acceptable.
On server side, we use const express = require('express')
*/

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
// unnecessary to assign variable since require statement does not return anything. We simply want to execute the file, that's all
// const passportConfig = require("./services/passport");
// simply calling require will execute what is in the require file

// order of require statements matters
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// each call to express() generates an app
const app = express();

// will take the request and assign it to bodyParser.json
app.use(bodyParser.json());

// cookie will last 30 days (in milliseconds)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

//
app.use(passport.initialize());
app.use(passport.session());

//the above 4 app.use() middlewares are applied to every single request that comes into the application

require("./routes/authRoutes")(app); // goes to the module.exports function in the authRoutes file with the parameter app
require("./routes/billingRoutes")(app); //valid because the require statement returns a function which we immediately call with the parameter (app

if (process.env.NODE_ENV == "production") {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// telling passport that we can use this strategy to authenticate users
// new GoogleStrategy(Client ID, Client Secret)
// Client ID is a public token that can be shared with the public. Simply identifies the application with Google Servers
// Client Secret is a private token. So it CANNOT be pushed to Github or else anyone who views the Github will have elevated privileges inside our application. So how can we store this client secret?

// the last option in this object
// is if a user grants permission, the callbackURL appends to the URL to redirect the user to a page on Google to get more information about the user

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
