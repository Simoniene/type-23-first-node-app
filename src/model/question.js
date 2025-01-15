import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("Question", questionSchema);
