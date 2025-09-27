import { createUser, findUserByEmailOrPhone, validatePassword } from "../../shared/models/userModel.js";
import { generateToken } from "../../shared/utils/token.js";

export async function citizenRegister(req, res) {
  try {
    const { name, email, phone, password } = req.body;
    const user = await createUser({ name, email, phone, password, role: "citizen" });
    res.status(201).json({ message: "Citizen registered", user, success: true });
  } catch (err) {
    res.status(400).json({ error: err.message, success: false });
  }
}

export async function citizenLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmailOrPhone(email);
    if (!user || user.role !== "citizen") return res.status(400).json({ error: "Invalid credentials", success: false });

    const valid = await validatePassword(user, password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials", success: false });

    const token = generateToken({ user_id: user.user_id, role: user.role });
    res.json({ token, user, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
}
