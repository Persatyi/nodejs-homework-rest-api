const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });

  sendMail({
    to: email,
    subject: "Confirm your email",
    html: "<a>Click here to confirm your email</a>",
  });
};

module.exports = register;
