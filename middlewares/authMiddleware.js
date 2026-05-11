const { verifyAccessToken } = require("../features/auth/services/accessTokenService");

exports.authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      const error = new Error("Token não encontrado");
      error.status = 401;
      throw error;
    }
    const token = req.headers.authorization.split(" ")[1];
    const validatedToken = verifyAccessToken(token);

    next();
  } catch (err) {
    next(err);
  }
};
