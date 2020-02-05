"use strict";
const router = require("express").Router();
const groupsController = require("../controllers/groups/groups");
const auth = require('../middlewares/check_token');

router.use(auth.check);
router.post("", groupsController.store);
router.get("", groupsController.show);
router.get("", groupsController.showById);
router.put("/:id", groupsController.update);
// router.delete("/:id", groupsController.delete);

module.exports = router;