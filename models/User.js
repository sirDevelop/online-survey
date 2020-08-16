// Create Mongoose model class here
const mongoose = require("mongoose");
// const Schema = mongoose.Schema; and const { Schema } = mongoose; are equivalent. We choose to use the 2nd one
// mongoose wants to know ahead of time all the different properties we may have in our collections. It will describe what each individual record will look like
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);
// create a new collection called users which follows the userSchema
// it will not overrite an existing schema. It will create it if it does not exist
