const passport = require("passport");
// a route handler that ensures the user gets kicked into the passport flow
// a user clicks login and then a route handler moves them into passport js
// (route, action (in code))

// we need to get app object from index.js into authRoutes
module.exports = (app) => {
  // authenticate('google') works because internally, GoogleStrategy is linked to a string called 'Google' and thats why we can authenticate with a string called Google
  // with scope, we ask Google to grant us access to a user's profile and email information (also set strings). There are more such as images, etc.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  //route handler

  // once use visits auth/google, server comes back with a code. With the code, we no longer have to enter the OAuth flow, we can directly find user profile details
  app.get("/auth/google/callback", passport.authenticate("google"));
  //route handler

  // second argument is an arrow function. All counts as one argument
  // app.get("/", (req, res) => {
  //   res.send({ bye: "buddy" });
  //   // send JSON back to whoever made this request
  // });

  // request and response
  // it takes the request and logs out of the application
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
    // res.send() proves to whoever is making this request, they are no longer logged in
  });

  // shows the currently logged in user. Will be emtpy if we log it out
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
