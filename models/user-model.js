const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  gender: { type: String },
  userType: { type: String },
  locationVal: { type: String },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Users", usersSchema);
