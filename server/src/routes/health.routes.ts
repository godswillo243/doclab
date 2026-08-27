import { Router } from "express";

import { db } from "../db/index.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    await db.execute("SELECT 1");

    res.json({
      success: true,
      message: "API is healthy",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
