const jwt = require("jsonwebtoken");

function createAccessToken({ userId, userName }) {
  return jwt.sign({ id: userId, name: userName }, process.env.JWT_SECRET, { expiresIn: "60m" });
}

exports.generateAccessToken = ({ userId, userName }) => {
  return createAccessToken({ userId, userName });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
