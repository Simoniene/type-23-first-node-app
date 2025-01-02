import { v4 as uuidv4 } from "uuid";
import TaskModel from "../model/task.js";

let tasks = [];

const INSERT_TASK = async (req, res) => {
  try {
    const newTask = {
      id: uuidv4(),
      title: req.body.title,
      points: req.body.points,
      status: false,
      date: new Date(),
      userId: req.body.userId,
    };

    const isTitleExists = tasks.some((task) => task.title === req.body.title);

    if (isTitleExists) {
      return res.status(409).json({ message: "this task already exist" });
    }

    const task = new TaskModel(newTask);

    const response = await task.save();

    return res
      .status(201)
      .json({ response: "task was inserted successfully", task: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ALL_TASKS = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.body.userId });
    return res.status(200).json({ tasks: tasks });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ id: req.params.id });

    if (task.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!task) {
      return res
        .status(404)
        .json({ message: `no task with id ${req.params.id}` });
    }

    return res.status(200).json({ task: task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ id: req.params.id });

    if (task.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Task was updated", task: updatedTask });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ id: req.params.id });

    if (task.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with ${req.params.id}  does not exist` });
    }

    const response = await TaskModel.findOneAndDelete({ id: req.params.id });

    return res
      .status(200)
      .json({ response: "task was deleted", task: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export {
  INSERT_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  DELETE_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
};
