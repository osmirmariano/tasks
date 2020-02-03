"use strict";
const router = require("express").Router();
const tasksController = require("../controllers/tasks/tasks");

router.post("", tasksController.store);
router.get("", tasksController.show);
router.get("", tasksController.showById);
router.put("/:id", tasksController.update);
router.delete("/:id", tasksController.delete);

module.exports = router;