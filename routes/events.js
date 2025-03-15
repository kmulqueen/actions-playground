import { Router } from "express";

import connectToDatabase from "../data/database.js";

const router = Router();

// Middleware to handle database connection errors
const withDb = (handler) => {
  return async (req, res, next) => {
    try {
      // Get database connection
      const db = await connectToDatabase();
      // Call the original route handler with db
      return await handler(req, res, db);
    } catch (err) {
      console.error("Database operation failed:", err);
      return res.status(500).json({ message: "Database operation failed" });
    }
  };
};

router.get(
  "/",
  withDb(async (req, res, db) => {
    const allEvents = await db.collection("events").find().toArray();
    res.json({ events: allEvents });
  })
);

router.post(
  "/",
  withDb(async (req, res, db) => {
    const eventData = req.body;
    const result = await db.collection("events").insertOne({ ...eventData });
    res.status(201).json({
      message: "Event created.",
      event: { ...eventData, id: result.insertedId },
    });
  })
);

export default router;
