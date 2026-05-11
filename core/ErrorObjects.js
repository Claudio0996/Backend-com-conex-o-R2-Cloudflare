exports.invalidToken = () => {
  const error = new Error("Token inválido");
  error.status = 401;
  return error;
};

exports.existingUser = () => {
  const error = new Error("Usuário já existe");
  error.status = 401;
  return error;
};

exports.notExistingUser = () => {
  const error = new Error("Usuário não existe");
  error.status = 404;
  return error;
};

exports.passwordsDontMatch = () => {
  const error = new Error("Senhas não são iguais");
  error.status = 401;
  return error;
};
