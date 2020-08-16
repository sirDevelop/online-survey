const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  // we can pass in as many middlewares as we want to. When accessing this network call, we will call requireLogin
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //route handler. When user accesses this route (as seen from the network tab), we will reach this function

    // we create a charge object
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });
    // console.log(req);
    // console.log(charge);

    //req.user assigned by passport and created based on the model / user schema we created for it
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
    // returns the data as a response. Can be viewed inside network call - preview tab. Without this, there is no response
  });
};
