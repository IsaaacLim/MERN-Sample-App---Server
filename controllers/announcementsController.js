const Announcement = require("../models/Announcements");
const asyncHandler = require("express-async-handler");

/**
 * @desc Get all announcements
 * @route GET /announcements
 * @access Private
 */
const getAllAnnouncements = asyncHandler(async (req, res) => {
  const announcement = await Announcement.find().lean();
  if (!announcement?.length) {
    return res.status(400).json({ message: "No announcement found" });
  }
  res.json(announcement);
});

/**
 * @desc Create new announcement
 * @route POST /announcements
 * @access Private
 */
const createNewAnnouncement = asyncHandler(async (req, res) => {
  const { title, text } = req.body;

  // Confirm data
  if (!title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const announcementObject = { title, text };

  //   Create and store new announcement
  const announcement = await Announcement.create(announcementObject);

  if (announcement) {
    res.status(201).json({ message: `New announcement ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

/**
 * @desc Update a announcement
 * @route PATCH /announcements
 * @access Private
 */
const updateAnnouncement = asyncHandler(async (req, res) => {
  const { id, title, text } = req.body;

  // Confirm data
  if (!id || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const announcement = await Announcement.findById(id).exec();

  if (!announcement) {
    return res.status(400).json({ message: "Announcement not found" }); // todo: fix this error
  }

  announcement.title = title;
  announcement.text = text;

  const updatedAnnouncement = await announcement.save();

  res.json({ message: `${updatedAnnouncement.title} updated` });
});

/**
 * @desc Delete a announcement
 * @route Delete /announcements
 * @access Private
 */
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Announcement ID required" });
  }

  const announcement = await Announcement.findById(id).exec();

  if (!announcement) {
    return res.status(400).json({ message: "Announcement not found" });
  }

  const result = await announcement.deleteOne();

  const reply = `Announcement ${announcement.title} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllAnnouncements,
  createNewAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
