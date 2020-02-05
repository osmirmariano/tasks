"use strict";
const router = require("express").Router();
const usersAdminController = require("../controllers/admin/users/users");
const admin = require('../middlewares/check_admin');
const auth = require('../middlewares/check_token');

router.use(admin.checkAdmin);
router.post("", usersAdminController.store);
router.use(auth.check);
router.delete("/:id", usersAdminController.delete);
router.get("", usersAdminController.show);

module.exports = router;