const Users = require("../models/user-model");

// Create User
exports.createUser = (req, res, next) => {
  let date = new Date();
  date.toString;
  const users = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    userType: req.body.userType,
    locationVal: req.body.locationVal,
    created_at: date,
  });
  users
    .save()
    .then((result) => {
      res.status(200).json({
        message: "User successfully created!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creation user failed!",
        err: err,
      });
    });
};

// Get all users
exports.getUsers = (req, res, next) => {
  Users.find({ deleted: false })
    .then((documents) => {
      res.status(200).json({
        message: "Users fetched!!!",
        result: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting list failed!",
      });
    });
};

// Get soft deleted users
exports.getDeletedUsers = (req, res, next) => {
  Users.find({ deleted: true })
    .then((documents) => {
      res.status(200).json({
        message: "Deleted Users fetched!!!",
        result: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting list failed!",
      });
    });
};

// Delete user from database
exports.deleteUser = (req, res, next) => {
  Users.deleteOne({ _id: req.body.userId })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting User failed!",
      });
    });
};

// Update user any field
exports.updateUser = (req, res, next) => {
  const user = {
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    userType: req.body.userType,
    locationVal: req.body.locationVal,
  };
  Users.findOneAndUpdate({ _id: req.body.id }, user)
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({ message: "Update User successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update user!",
        err: error,
      });
    });
};

// Soft delete> not deleting from database
exports.softDeleteUser = (req, res, next) => {
  console.log(req.body);
  const user = {
    _id: req.body.userId,
    deleted: true,
  };
  Users.findOneAndUpdate({ _id: req.body.userId }, user)
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({ message: "Deleted User successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't Delete user!",
        err: error,
      });
    });
};
