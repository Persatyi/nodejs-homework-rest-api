const express = require("express");

const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { validation } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

router.post(
  "/users/signup",
  validation(schemas.registerUser),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/users/login",
  validation(schemas.loginUser),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
