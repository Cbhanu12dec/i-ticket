var express = require("express");
var router = express.Router();
var usersService = require("../services/user-service");

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

module.exports = router;
