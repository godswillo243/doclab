import { Router } from "express";

import {
  logout,
  refresh,
  signIn,
  signUp,
  verifyEmail,
} from "./auth.controller";

const router = Router();

router.post("/sign-up", signUp);
router.post("/verify-email", verifyEmail);
router.post("/sign-in", signIn);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
