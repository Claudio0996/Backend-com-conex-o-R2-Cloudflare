const { hashPassword } = require("../../security/services/passwordService");
const User = require("../repositories/userRepository");
const { existingUser } = require("../../../core/ErrorObjects");

exports.createUser = async ({ userName, email, password }) => {
  const foundUser = await User.findUserByEmail({ email });

  if (foundUser) {
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
