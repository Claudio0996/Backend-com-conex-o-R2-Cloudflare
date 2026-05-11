const authService = require("../services/authService");
const { loginSchema } = require("../../user/schemas/userSchema");
const { sendRefreshCookie } = require("../../../core/httpOnlyCookies");

exports.loginUser = async (req, res, next) => {
  const userData = req.body;
  console.log(userData);

  try {
    const validatedData = loginSchema.safeParse(userData);
    if (!validatedData.success) {
      const errors = validatedData.error.issues.map((issue) => issue.message);

      const error = {
        message: errors,
        status: 400,
      };
      throw error;
    }

    console.log(validatedData);
    const data = await authService.loginUser({
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    sendRefreshCookie(res, data.refreshToken, data.expiration);
    const { user, token } = data;

    res.status(200).json({
      success: true,
      data: {
        user,
        token,
      },
      message: "Login realizado com sucesso",
    });
  } catch (err) {
    console.log(`[Login Controller Error]: ${err.message}`);
    next(err);
  }
};

exports.refreshSession = async (req, res, next) => {
  const oldRefreshToken = req.cookies.refreshToken;

  try {
    if (!oldRefreshToken) {
      const error = {
        message: ["Token de sessão ausente"],
        status: 401,
      };
      throw error;
    }
    const data = await authService.refreshSession({ oldRefreshToken });
    const { token } = data;

    sendRefreshCookie(res, data.refreshToken, data.expiration);

    res.status(200).json({
      success: true,
      data: {
        token,
      },
      message: "Token atualizado com sucesso",
    });
  } catch (err) {
    console.log(`[RefreshSession Controller Error]: ${err}`);
    next(err);
  }
};
