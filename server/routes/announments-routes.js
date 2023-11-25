var express = require("express");
const announcementService = require("../services/announcement-service");
var router = express.Router();

router.get("/announcements", async (req, res) => {
  try {
    const announcementResponse = await announcementService.getAnnouncements();
    res.json({ announcements: announcementResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create-announcement", async (req, res) => {
  const payload = req.body;
  try {
    const announcementResponse = await announcementService.createAnnouncement(
      payload
    );
    res.json({ announcement: announcementResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-announcement", async (req, res) => {
  const payload = req.body;
  try {
    const announcementResponse =
      await announcementService.updateAnnouncementByID(payload);
    res.json({ announcement: announcementResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-announcement", async (req, res) => {
  const id = req.query.id;
  try {
    const announcementResponse =
      await announcementService.deleteAnnouncementByID(id);
    res.json({ announcements: announcementResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
