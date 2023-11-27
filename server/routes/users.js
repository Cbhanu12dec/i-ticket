var express = require("express");
var router = express.Router();
var usersService = require("../services/user-service");
const AWS = require("aws-sdk");
const multer = require("multer");

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/get-user-by-email", async (req, res, next) => {
  const email = req.query.email;
  try {
    const userDetails = await usersService.getUsersByEmail(email);
    res.json({ userInfo: userDetails, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async function (req, res, next) {
  const payload = req.body;
  try {
    const users = await usersService.login(payload);
    if (users === "FAILED_LOGIN") {
      res.status(500).json({ error: "Failed to Login..!" });
    } else {
      res.json({ users: users, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/signup", async function (req, res, next) {
  const payload = req.body;
  try {
    const users = await usersService.createUsers(payload);
    res.json({ users: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/upload-users", async function (req, res, next) {
  const payload = req.body;
  try {
    const users = await usersService.uploadUsers(payload);
    res.json({ users: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-user-access", async function (req, res, next) {
  const payload = req.body.userAccessInfo;
  try {
    const users = await usersService.updateUserAccess(payload);
    res.json({ users: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/download-template", (req, res) => {
  const fileName = req.query.fileName;
  const params = {
    Bucket: "i-ticket/template",
    Key: fileName,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.attachment(fileName);
      res.send(data.Body);
    }
  });
});

module.exports = router;
