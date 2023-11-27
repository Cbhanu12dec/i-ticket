var express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const ticketService = require("../services/ticket-service");

var router = express.Router();

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-ticket", upload.any("files"), async (req, res) => {
  const payload = req.body;
  const file = req.files[0];
  try {
    const ticketResponse = await ticketService.createTicket(payload, file);
    res.json({ ticketInfo: ticketResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-comments", async (req, res) => {
  const payload = req.body;
  // console.log("******** ticket info,:", payload);
  try {
    const ticketResponse = await ticketService.updateComments(payload);
    res.json({ ticketInfo: ticketResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/get-all-tickets", async (req, res) => {
  try {
    const ticketResponse = await ticketService.getAllTickets();
    res.json({ ticketInfo: ticketResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/download", (req, res) => {
  const fileName = req.query.fileName;
  const params = {
    Bucket: "i-ticket/tickets",
    Key: fileName,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.attachment(fileName); // Set the file name for the download
      res.send(data.Body);
    }
  });
});
module.exports = router;
