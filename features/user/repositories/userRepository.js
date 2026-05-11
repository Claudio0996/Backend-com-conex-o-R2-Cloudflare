const User = require("../model/userModel");

exports.findUserByEmail = async ({ email }) => {
  const existingUser = await User.findOne({ email });

  return existingUser;
};

exports.saveUser = async (userData) => {
  const user = await User.create(userData);

  return user;
};

exports.findById = async ({ id }) => {
  const existingUser = await User.findById(id);

  return existingUser;
};

exports.findUserWithPassowrd = async ({ email }) => {
  const userData = await User.findOne({ email }).select("userName email passwordHash");
};
