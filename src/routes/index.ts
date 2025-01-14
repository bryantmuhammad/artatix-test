import express from "express";

import authRouter from "./auth";
import talentRouter from "./talent";
import { authMiddleware } from "../middleware/app.middleware";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/talent", authMiddleware, talentRouter);

export default router;
