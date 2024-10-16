const asyncHandler = require("express-async-handler");
// @desc Get all contacts
// @route Get /api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

// @desc Get the contact
// @route GET /api/contacts
// @access public
const getAConcat = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Get a contact" });
});

// @desc POST New contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { Id, Name, Phone } = req.body;

  if (!Id || !Name || !Phone) {
    res.status(400);
    throw new Error("All fields should be filled");
  } else {
    res.status(201).json({ message: JSON.stringify(req.body) });
  }
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `Update contact for ${req.params.id}` });
});

// @desc DELETE contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {
  getContact,
  getAConcat,
  createContact,
  updateContact,
  deleteContact,
};
