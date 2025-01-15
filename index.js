import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./src/route/user.js";
import answerRouter from "./src/route/answer.js";
import questionRouter from "./src/route/question.js";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(userRouter);
app.use(answerRouter);
app.use(questionRouter);

app.use((req, res) => {
  res.status(404).json({ response: "your endpoint does not exit" });
});

app.listen(process.env.PORT, () => {
  console.log(`App was started on port ${process.env.PORT}`);
});
