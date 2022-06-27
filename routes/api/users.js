const express = require("express");

const { upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const { auth } = require("../../middlewares");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

router.patch(
  "/avatars",
  auth,
  upload.single("avatarURL"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
