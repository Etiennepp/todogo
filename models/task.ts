import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
     {
          name: String,
          completed: Boolean,
     },
     { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
