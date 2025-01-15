import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../model/answer.js";

const INSERT_ANSWER = async (req, res) => {
  try {
    const newAnswer = {
      id: uuidv4(),
      answer: req.body.answer,
      status: false,
      date: new Date(),
      userId: req.body.userId,
    };

    const isAnswerExists = await AnswerModel.findOne({
      answer: req.body.answer,
    });

    if (isAnswerExists) {
      return res.status(409).json({ message: "this answer already exist" });
    }

    const answer = new AnswerModel(newAnswer);

    const response = await answer.save();

    return res
      .status(201)
      .json({ response: "answer was inserted successfully", answer: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ALL_ANSWERS = async (req, res) => {
  try {
    const answer = await AnswerModel.find({ userId: req.body.userId });
    return res.status(200).json({ answer: answer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ANSWER_BY_ID = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (answer.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!answer) {
      return res
        .status(404)
        .json({ message: `no answer with id ${req.params.id}` });
    }

    return res.status(200).json({ answer: answer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_ANSWER_BY_ID = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (answer.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    const updatedAnswer = await AnswerModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Answer was updated", answer: updatedAnswer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_ANSWER_BY_ID = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (answer.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!answer) {
      return res
        .status(404)
        .json({ message: `Answer with ${req.params.id}  does not exist` });
    }

    const response = await AnswerModel.findOneAndDelete({ id: req.params.id });

    return res
      .status(200)
      .json({ response: "Answer was deleted", answer: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export {
  INSERT_ANSWER,
  GET_ALL_ANSWERS,
  GET_ANSWER_BY_ID,
  DELETE_ANSWER_BY_ID,
  UPDATE_ANSWER_BY_ID,
};
