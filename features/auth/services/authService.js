const PasswordService = require("../../security/services/passwordService");
const UserService = require("../../user/service/userService");
const RefreshTokenService = require("../../token/service/refreshTokenService");
const AccessTokenService = require("./accessTokenService");

const { notExistingUser, passwordsDontMatch } = require("../../../core/ErrorObjects");

exports.registerUser = async ({ userName, email, password }) => {
  const createdUser = await UserService.createUser({
    userName,
    email,
    password,
  });
  const { passwordHash, ...safeUser } = createdUser.toObject();

  const accessToken = await AccessTokenService.generateAccessToken({
    userId: createdUser._id,
    userName: createdUser.userName,
  });
  const refreshToken = await RefreshTokenService.createToken(createdUser._id);

  return {
    user: safeUser,
    token: accessToken,
    refreshToken: refreshToken.token,
    expiration: refreshToken.expiresAt,
  };
};

exports.loginUser = async ({ email, password }) => {
  const existingUser = await UserService.findUserByEmail({ email });

  if (!existingUser) {
    const error = notExistingUser();
    throw error;
  }

  const { passwordHash, ...safeUser } = existingUser.toObject();

  const matchedPassword = await PasswordService.comparePassword(password, passwordHash);

  if (!matchedPassword) {
    const error = passwordsDontMatch();
    throw error;
  }

  const accessToken = await AccessTokenService.generateAccessToken({
    userId: existingUser._id,
    userName: existingUser.userName,
  });
  await RefreshTokenService.revokeAllToken(existingUser._id);
  const refreshToken = await RefreshTokenService.createToken(existingUser._id);

  return {
    user: safeUser,
    token: accessToken,
    refreshToken: refreshToken.token,
    expiration: refreshToken.expiresAt,
  };
};

exports.refreshSession = async ({ oldRefreshToken }) => {
  const { userId, userName, newToken } = await RefreshTokenService.rotateToken(oldRefreshToken);

  const accessToken = await AccessTokenService.generateAccessToken({ userId, userName });

  return {
    token: accessToken,
    refreshToken: newToken.token,
    expiration: newToken.expiresAt,
  };
};
