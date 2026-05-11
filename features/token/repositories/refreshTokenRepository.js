const RefreshTokenModel = require("../model/refreshTokenModel");

//Função para salvar o token no banco de dados
exports.save = async (tokenData) => {
  return await RefreshTokenModel.create(tokenData);
};

//Função para invalidar o token e retornar o documento antigo invalidado
exports.rotateTokenAtomic = async (oldToken) => {
  return await RefreshTokenModel.findOneAndUpdate(
    {
      token: oldToken,
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    },
    { $set: { revokedAt: new Date() } },
  );
};

//Função para marcar qual token substituiu o token revogado
exports.setReplacedToken = async (oldToken, newToken) => {
  return await RefreshTokenModel.updateOne(
    {
      token: oldToken,
    },
    { $set: { replacedBy: newToken } },
  );
};

//Função para revogar o token manulamente
exports.revokeToken = async (token) => {
  return await RefreshTokenModel.updateOne({ token }, { revokedAt: new Date() });
};

//Função para revogar todos os tokens de um usuário
exports.revokeAllByUser = async (userId) => {
  return await RefreshTokenModel.updateMany({ userId, revokedAt: null }, { revokedAt: new Date() });
};
