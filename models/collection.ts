import mongoose from "mongoose";
import Task from "./task";
const CollectionSchema = new mongoose.Schema(
     {
          name: {
               type: String,
               minLength: 1,
               maxLength: 30,
               required: [true, "Collection name is required"],
          },
          color: {
               type: String,
               minLength: 1,
               maxLength: 20,
               required: [true, "Collection color is required"],
          },
          lists: [
               {
                    type: new mongoose.Schema(
                         {
                              name: String,
                              color: String,
                              emoji: String,
                              tasks: [Task.schema],
                         },
                         { timestamps: true }
                    ),
               },
          ],
     },
     { timestamps: true }
);

export default mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
