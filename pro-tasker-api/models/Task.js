import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

export default Task;