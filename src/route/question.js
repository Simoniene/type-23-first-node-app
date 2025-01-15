import express from "express";
import auth from "../middleware/auth.js";

import {
  INSERT_QUESTION,
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  UPDATE_QUESTION_BY_ID,
  DELETE_QUESTION_BY_ID,
} from "../controller/question.js";

const router = express.Router();

router.post("/questions", auth, INSERT_QUESTION);
router.get("/questions", auth, GET_ALL_QUESTIONS);
router.get("/questions/:id", auth, GET_QUESTION_BY_ID);
router.put("/questions/:id", auth, UPDATE_QUESTION_BY_ID);
router.delete("/questions/:id", auth, DELETE_QUESTION_BY_ID);

export default router;
