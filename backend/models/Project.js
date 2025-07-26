import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    html: String,
    css: String,
    js: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
