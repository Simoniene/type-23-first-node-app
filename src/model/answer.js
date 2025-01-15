import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answer: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("Answer", answerSchema);
