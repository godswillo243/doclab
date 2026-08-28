import { Router } from "express";
import healthRouter from "./health.routes";
import authRouter from "../modules/auth/auth.routes";
import usersRouter from "../modules/users/users.routes";
import { clientTypeMiddleware } from "../middleware/client-type.middleware";
import { deviceIdMiddleware } from "../middleware/device-id.middleware";
const router = Router();

router.use("/health", healthRouter);
router.use("/auth", clientTypeMiddleware, deviceIdMiddleware, authRouter);
router.use("/users", usersRouter);

export default router;
