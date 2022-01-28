const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  name: String,
  model: Number,
  company: String,
  ownerId: String
});

module.exports = mongoose.model("Shoes", ShoeSchema);



//owner.js
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});

module.exports = mongoose.model("owners", ownerSchema);