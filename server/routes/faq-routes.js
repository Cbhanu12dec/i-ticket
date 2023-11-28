var express = require("express");
const multer = require("multer");
const faqService = require("../services/faq-service");
var router = express.Router();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();
router.get("/faq-list", async (req, res) => {
  try {
    const faqResponse = await faqService.getFaqs();
    res.json({ faq: faqResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-faq", upload.any("files"), async (req, res) => {
  const payload = req.body;
  const file = req?.files === undefined ? undefined : req?.files[0];
  try {
    const faqResponse = await faqService.createFaq(payload, file);
    res.json({ faqs: faqResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-faq", upload.any("files"), async (req, res) => {
  const payload = req?.body;
  const file = req?.files === undefined ? undefined : req?.files[0];
  try {
    const faqResponse = await faqService.updateFaq(payload, file);
    res.json({ faqs: faqResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/hide", async (req, res) => {
  const payload = req?.body;
  try {
    const faqResponse = await faqService.hideFaq(payload);
    res.json({ faqs: faqResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-faq", async (req, res) => {
  const id = req.query.id;
  try {
    const faqResponse = await faqService.deleteFaqByID(id);
    res.json({ faq: faqResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/download", (req, res) => {
  const fileName = req.query.fileName;
  const params = {
    Bucket: "i-ticket/faq",
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
