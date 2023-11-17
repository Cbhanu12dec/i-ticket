var express = require("express");
const faqService = require("../services/faq-service");
var router = express.Router();

router.get("/faq", async (req, res) => {
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
  const file = req.files[0];
  try {
    const faqResponse = await faqService.createFaq(payload, file);
    res.json({ faq: faqResponse, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
