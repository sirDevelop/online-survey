/*
on the server side of our application we do not have access to ES2015 modules 
So we cannot just use
import express from 'express'
But on the front end, we do have access, so using this is acceptable.
On server side, we use const express = require('express')
*/

const express = require("express");
const app = express();

// second argument is an arrow function. All counts as one argument
app.get("/", (req, res) => {
  res.send({ hi: "there" });
  // send JSON back to whoever made this request
});
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
