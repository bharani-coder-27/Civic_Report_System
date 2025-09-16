import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" }); // valid for 1 day
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
