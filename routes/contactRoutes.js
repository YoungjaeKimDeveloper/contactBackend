const express = require("express");
const router = express.Router();
// Get the controller from other file
const {
  getContact,
  getAConcat,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Before Refactoring
router.route("/").get(getContact);

router.route("/:id").get(getAConcat);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

// // After Refactoring
// router.route("/").get(getContact).post(createContact);

// router.route("/:id").get(getAConcat).put(updateContact).delete(deleteContact);

module.exports = router;
