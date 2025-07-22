const express = require("express");
const router = express.Router();
const controller = require("../controller/journalController");

router.get("/", controller.getEntries);
router.delete("/:id", controller.deleteEntry);
router.put("/:id", controller.updateEntry);
router.post("/", controller.createEntry);
router.get("/:id", controller.getEntryById);

module.exports = router;