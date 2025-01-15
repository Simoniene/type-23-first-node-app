import express from "express";
import auth from "../middleware/auth.js";

import {
  INSERT_ANSWER,
  GET_ALL_ANSWERS,
  GET_ANSWER_BY_ID,
  UPDATE_ANSWER_BY_ID,
  DELETE_ANSWER_BY_ID,
} from "../controller/answer.js";

const router = express.Router();

router.post("/answers", auth, INSERT_ANSWER);
router.get("/answers", auth, GET_ALL_ANSWERS);
router.get("/answers/:id", auth, GET_ANSWER_BY_ID);
router.put("/answers/:id", auth, UPDATE_ANSWER_BY_ID);
router.delete("/answers/:id", auth, DELETE_ANSWER_BY_ID);

export default router;
