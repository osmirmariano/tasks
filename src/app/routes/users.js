"use strict";
const router = require("express").Router();
const usersController = require("../controllers/users/users");
const auth = require('../middlewares/check_token')

router.post("", usersController.store);
router.use(auth.check)
router.put("/:id", usersController.update);
router.get("/:id", usersController.showById);


module.exports = router;