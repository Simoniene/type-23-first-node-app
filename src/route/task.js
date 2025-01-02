import express from "express";
import auth from "../middleware/auth.js";

import {
  INSERT_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
  DELETE_TASK_BY_ID,
} from "../controller/task.js";

const router = express.Router();

router.post("/tasks", auth, INSERT_TASK);
router.get("/tasks", auth, GET_ALL_TASKS);
router.get("/tasks/:id", auth, GET_TASK_BY_ID);
router.put("/tasks/:id", auth, UPDATE_TASK_BY_ID);
router.delete("/tasks/:id", auth, DELETE_TASK_BY_ID);

export default router;
