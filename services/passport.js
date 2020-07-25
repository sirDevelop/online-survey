const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const { deserializeUser } = require("passport");

// this statement pulls the schema out of mongoose
// mongoose.model. 1 argument means we are pulling a schema out of mongoose, 2 arguments means we are loading a schema into mongoose
const User = mongoose.model("users");

// after the user has signed in, we no longer care about the profile ID anymore. It is only for authenticating and signing in with Google.
// we care about the mongo ID after that because it is unique for each user. Also not every user has a google ID. maybe they signed in with Facebook or Twitter
// the mongo ID is part of the user ID
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // given an id, it fetches back a user
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // this is mongoose's User
      // check for a user where their googleId is equal to mongoose's profile Id
      // does not return a user, returns a promise
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID

          //done has 2 arguments done(error, userRecord that was returned)
          done(null, existingUser);
        } else {
          // we do not have a user record with this ID
          // .save() saves it to the mongoDB database from the model instance

          // to serialize we can use this mongo id. We call serializeUser on this mongo Id to generate an identifying piece of information and store it in a cookie
          // then when we need to, we use this serializeUser mongoId from a cookie, pass it into deserialize user and turn it into a user
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
          // if save is successful, then we say it is done
          //we need to call done() to tell passport that we are done. And to proceed with the authentication flow so it does not hang there on the screen
        }
      });

      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      // after we reach the callback URL, we will reach the second function
      // access token is a token that allows the user to have permissions within the user account to for example delete emails, update profile pic, etc
      // refresh token allows us to refresh the access token because access token expires after some time
    }
  )
);
