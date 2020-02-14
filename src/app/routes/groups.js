"use strict";
const router = require("express").Router();
const groupsController = require("../controllers/groups/groups");
const auth = require('../middlewares/check_token');
const permission = require('../middlewares/check_permission');

router.use(auth.check);
router.post("", groupsController.store);
router.get("", groupsController.show);
router.get("/:id", groupsController.showById);
router.use(permission.checkPermissionGroup)
router.put("/:id", groupsController.update);
router.delete("/:id", groupsController.delete);
router.put("/share/:id", groupsController.share)

module.exports = router;