import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

const INSERT_QUESTION = async (req, res) => {
  try {
    const newQuestion = {
      id: uuidv4(),
      question: req.body.question,
      status: false,
      date: new Date(),
      userId: req.body.userId,
    };

    const isQuestionExists = await QuestionModel.findOne({
      question: req.body.question,
    });

    if (isQuestionExists) {
      return res.status(409).json({ message: "this question already exist" });
    }

    const question = new QuestionModel(newQuestion);

    const response = await question.save();

    return res.status(201).json({
      response: "question was inserted successfully",
      question: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ userId: req.body.userId });
    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });

    if (question.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!question) {
      return res
        .status(404)
        .json({ message: `no question with id ${req.params.id}` });
    }

    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });

    if (question.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    const updatedQuestion = await QuestionModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Question was updated", question: updatedQuestion });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });

    if (question.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with ${req.params.id}  does not exist` });
    }

    const response = await QuestionModel.findOneAndDelete({
      id: req.params.id,
    });

    return res
      .status(200)
      .json({ response: "question was deleted", question: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export {
  INSERT_QUESTION,
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  DELETE_QUESTION_BY_ID,
  UPDATE_QUESTION_BY_ID,
};
