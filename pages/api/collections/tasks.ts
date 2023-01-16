import dbConnect from "../../../lib/mongodb";
import { NextApiResponse } from "next";
import Collection from "../../../models/collection";
import mongoose from "mongoose";

export default async function handler(req: any, res: NextApiResponse) {
     const { method } = req;

     await dbConnect();

     switch (method) {
          case "POST":
               try {
                    const { collection_id, list_id, name } = req.body;
                    const task = { name: name, completed: false, _id: new mongoose.Types.ObjectId() };
                    const collection = await Collection.findById(collection_id);
                    collection.lists.id(list_id).tasks.push(task);
                    await collection.save();
                    res.status(201).json({ success: true, data: task });
               } catch (error) {
                    console.log(error);
                    res.status(400).json({ success: false });
               }
               break;
          case "DELETE":
               try {
                    const { collection_id, list_id, task_id } = req.body;
                    const collection = await Collection.findById(collection_id);
                    collection.lists.id(list_id).tasks.pull({ _id: task_id });
                    await collection.save();
                    res.status(201).json({ success: true, data: collection });
               } catch (error) {
                    console.log(error);
                    res.status(400).json({ success: false });
               }
               break;
          case "PATCH":
               try {
                    const { completed, name, task_id, collection_id, list_id } = req.body;

                    const collection = await Collection.findById(collection_id);
                    if (typeof completed !== "undefined")
                         collection.lists.id(list_id).tasks.id(task_id).completed = completed;
                    if (typeof name !== "undefined") {
                         console.log("tres");
                         collection.lists.id(list_id).tasks.id(task_id).name = name;
                    }
                    await collection.save();
                    res.status(201).json({ success: true, data: collection });
               } catch (error) {
                    console.log(error);
                    res.status(400).json({ success: false });
               }
               break;
          default:
               res.status(400).json({ success: false });
               break;
     }
}
