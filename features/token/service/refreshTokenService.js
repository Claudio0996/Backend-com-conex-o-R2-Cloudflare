const crypto = require("crypto");

const RefreshTokenRepository = require("../repositories/refreshTokenRepository");
const { invalidToken } = require("../../../core/ErrorObjects");

//Função para criar um token aleatório
const createTokenString = () => {
  const randomBytes = crypto.randomBytes(32);
  return randomBytes.toString("hex");
};

//Função para gerar o objeto de token
const generateTokenObject = ({ userId, expiresAt }) => {
  const token = createTokenString();

  return {
    userId,
    token,
    expiresAt: expiresAt !== undefined ? expiresAt : Date.now() + parseInt(process.env.REFRESH_TOKEN_TTL_MS),
  };
};

//Função para salvar o token no banco e retornar a string do token
const saveToken = async (tokenObject) => {
  const tokenSaved = await RefreshTokenRepository.save(tokenObject);
  return { token: tokenSaved.token, expiresAt: tokenSaved.expiresAt };
};

//Função para criar o primeiro token (pós cadastro)
exports.createToken = async (userId) => {
  const tokenObject = generateTokenObject({ userId });

  return await saveToken(tokenObject);
};

//Função para rotacionar o token antigo pelo novo
exports.rotateToken = async (oldToken) => {
  const rotatedToken = await RefreshTokenRepository.rotateTokenAtomic(oldToken);

  if (!rotatedToken) {
    const error = invalidToken();
    throw error;
  }

  const newToken = generateTokenObject({ expiresAt: rotatedToken.expiresAt, userId: rotatedToken.userId });
  const savedToken = await saveToken(newToken);

  await RefreshTokenRepository.setReplacedToken(rotatedToken.token, savedToken.token);

  return { newToken: savedToken, userId: rotatedToken.userId, userName: rotatedToken.userName };
};

//Função pública para revogar token manualmente
exports.revokeToken = async (token) => {
  const { modifiedCount } = await RefreshTokenRepository.revokeToken(token);

  if (modifiedCount !== 1) {
    const error = invalidToken();
    throw error;
  }
};

//Função para revogar todos os tokens de um usuário ao fazer login
exports.revokeAllToken = async (userId) => {
  const { modifiedCount } = await RefreshTokenRepository.revokeAllByUser(userId);
};
