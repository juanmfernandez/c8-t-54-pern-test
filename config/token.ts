const jwt = require("jsonwebtoken");

const generateToken = (payload: any) => {
  const token = jwt.sign({ user: payload }, process.env.SECRET, {
    expiresIn: "2d",
  });
  return token;
};

const validateToken = (token: any) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { generateToken, validateToken };
