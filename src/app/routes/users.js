"use strict";
const router = require("express").Router();
const usersController = require("../controllers/users/users");
const loginController = require("../controllers/users/login");

router.post("", usersController.store);
router.get("", usersController.show);
router.get("", usersController.showById);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

router.post("/login", loginController.login)

module.exports = router;