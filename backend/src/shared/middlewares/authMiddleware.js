import { verifyToken } from "../utils/token.js";

export function authMiddleware(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    console.log("Auth Header:", authHeader); // Debugging line

    const token = authHeader.split(" ")[1];
    try {
      const decoded = verifyToken(token);
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      //console.log("Decoded Token:", decoded); // Debugging line
      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
