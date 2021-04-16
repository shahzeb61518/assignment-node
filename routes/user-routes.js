const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user-controller");

// Create user
router.post("/add", Controller.createUser);

//  Get user list
router.get("/get", Controller.getUsers);

//  Get Deleted user list
router.get("/get-deleted-user", Controller.getDeletedUsers);

//  Delete user
router.delete("/delete", Controller.deleteUser);

//  Update user
router.put("/update", Controller.updateUser);

//  Soft Delete user
router.put("/soft-delete", Controller.softDeleteUser);

module.exports = router;
