import mongoose from "mongoose";

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
                    name: String,
                    todos: [
                         {
                              name: String,
                              completed: Boolean,
                         },
                    ],
               },
          ],
     },
     { timestamps: true }
);

export default mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
