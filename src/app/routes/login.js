"use strict";
const router = require("express").Router();
const loginController = require("../controllers/users/login");

router.post("", loginController.login)

module.exports = router;