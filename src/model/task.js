import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  points: { type: Number, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);
