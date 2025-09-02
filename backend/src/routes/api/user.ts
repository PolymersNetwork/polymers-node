/**
 * user.ts
 * Routes for user management in Polymers Node backend
 */

import { Router } from "express";
import { User, UserMap } from "../../types/users";

// In-memory store for demonstration
const users: UserMap = {};

const router = Router();

/**
 * GET /api/user/:userId
 * Fetch user profile by ID
 */
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = users[userId];

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, user });
});

/**
 * POST /api/user
 * Create or update a user profile
 */
router.post("/", (req, res) => {
  const { userId, username, email, wallets } = req.body as Partial<User>;

  if (!userId || !username) {
    return res.status(400).json({ success: false, message: "Missing required fields: userId or username" });
  }

  const existingUser = users[userId] || {
    userId,
    username,
    registeredAt: Date.now(),
    wallets: [],
    isActive: true,
  };

  // Update fields
  existingUser.username = username;
  existingUser.email = email ?? existingUser.email;
  existingUser.wallets = wallets ?? existingUser.wallets;
  existingUser.lastLogin = Date.now();
  existingUser.isActive = true;

  users[userId] = existingUser;

  res.json({ success: true, user: existingUser });
});

/**
 * GET /api/user
 * List all users
 */
router.get("/", (_req, res) => {
  res.json({
    success: true,
    totalUsers: Object.keys(users).length,
    users: Object.values(users),
  });
});

/**
 * DELETE /api/user/:userId
 * Remove a user by ID
 */
router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!users[userId]) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  delete users[userId];
  res.json({ success: true, message: `User ${userId} deleted` });
});

export default router;
