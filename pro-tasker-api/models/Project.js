import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

export default Project;