import express from "express";

import { SIGN_IN, LOGIN } from "../controller/user.js";

const router = express.Router();

router.post("/sign_in", SIGN_IN);
router.post("/login", LOGIN);

export default router;
