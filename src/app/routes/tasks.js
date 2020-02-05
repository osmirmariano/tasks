"use strict";
const router = require("express").Router();
const tasksController = require("../controllers/tasks/tasks");
const auth = require('../middlewares/check_token');

router.use(auth.check);
router.post("", tasksController.store);
router.get("", tasksController.show);
router.get("", tasksController.showById);
router.put("/:id", tasksController.update);
// router.delete("/:id", tasksController.delete);

module.exports = router;