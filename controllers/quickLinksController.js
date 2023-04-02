const QuickLink = require("../models/QuickLinks");
const asyncHandler = require("express-async-handler");

/**
 * @desc Get all quickLinks
 * @route GET /quickLinks
 * @access Private
 */
const getAllQuickLinks = asyncHandler(async (req, res) => {
  const quickLink = await QuickLink.find().lean();
  if (!quickLink?.length) {
    return res.status(400).json({ message: "No quickLink found" });
  }
  res.json(quickLink);
});

/**
 * @desc Create new quickLink
 * @route POST /quickLink
 * @access Private
 */
const createNewQuickLink = asyncHandler(async (req, res) => {
  const { title, text, link } = req.body;

  // Confirm data
  if (!title || !text || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const quickLinkObject = { title, text, link };

  //   Create and store new quickLink
  const quickLink = await QuickLink.create(quickLinkObject);

  if (quickLink) {
    res.status(201).json({ message: `New quickLink ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

/**
 * @desc Update a quickLink
 * @route PATCH /quickLink
 * @access Private
 */
const updateQuickLink = asyncHandler(async (req, res) => {
  const { id, title, text, link } = req.body;

  // Confirm data
  if (!id || !title || !text || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const quickLink = await QuickLink.findById(id).exec();

  if (!quickLink) {
    return res.status(400).json({ message: "QuickLink not found" }); // todo: fix this error
  }

  quickLink.title = title;
  quickLink.text = text;
  quickLink.link = link;

  const updatedQuickLink = await quickLink.save();

  res.json({ message: `${updatedQuickLink.title} updated` });
});

/**
 * @desc Delete a quickLink
 * @route Delete /quickLink
 * @access Private
 */
const deleteQuickLink = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "QuickLink ID required" });
  }

  const quickLink = await QuickLink.findById(id).exec();

  if (!quickLink) {
    return res.status(400).json({ message: "QuickLink not found" });
  }

  const result = await quickLink.deleteOne();

  const reply = `QuickLink ${quickLink.title} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllQuickLinks,
  createNewQuickLink,
  updateQuickLink,
  deleteQuickLink,
};
