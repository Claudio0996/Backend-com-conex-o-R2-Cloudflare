const { hashPassword } = require("../../security/services/passwordService");
const { existingUser } = require("../../../core/ErrorObjects");
const User = require("../repositories/userRepository");

exports.createUser = async ({ userName, email, password }) => {
  const existingUser = await User.findUserByEmail({ email });

  if (existingUser) {
    const error = existingUser();
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  return await User.saveUser({ userName, email, passwordHash: hashedPassword });
};

exports.findUserByEmail = async ({ email }) => {
  return await User.findUserByEmail({ email: email });
};

exports.findFullUser = async ({ email }) => {
  return await User.findUserWithPassowrd({ email });
};
