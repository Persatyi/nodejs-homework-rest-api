const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  if (!bcrypt.compare(password, user.password)) {
    throw createError(401, "Email or password is wrong");
  }
  const token = "qweqrqrwr.qweqweqwrwe.qwfcfdvgeff";
  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
