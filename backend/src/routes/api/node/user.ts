/**
 * user.ts
 * Express routes for user management in Polymers Node
 */

import { Router, Request, Response } from "express";
import { User, UserMap } from "../../../types/users";

// In-memory user store for demo purposes
const users: UserMap = {};

const router = Router();

/**
 * GET /api/user/:userId
 * Fetch a user profile by ID
 */
router.get("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = users[userId];

  if (!user) {
    console.warn(`[UserRoute] User ${userId} not found`);
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, user });
});

/**
 * POST /api/user
 * Create a new user or update existing profile
 */
router.post("/", (req: Request, res: Response) => {
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

  console.log(`[UserRoute] User ${userId} created/updated`);
  res.json({ success: true, user: existingUser });
});

/**
 * GET /api/user
 * List all users
 */
router.get("/", (_req: Request, res: Response) => {
  const allUsers = Object.values(users);
  res.json({
    success: true,
    totalUsers: allUsers.length,
    users: allUsers,
  });
});

export default router;
