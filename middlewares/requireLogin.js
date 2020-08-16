// classes that start with lower case letters indicate exporting a function
// classes the start with upper case letters indicate exporting a class

module.exports = (req, res, next) => {
  //next is a function called when the middleware is complete. It will pass the middleware to the 'next' middleware in the chain

  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }

  next(); //continue on to the next middleware
};

// we can wire this up to index.js, but it will not make sense. Only /api/stripe needs this
