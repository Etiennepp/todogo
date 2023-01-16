import dbConnect from "../../../lib/mongodb";
import { NextApiResponse } from "next";
import Collection from "../../../models/collection";
import mongoose from "mongoose";
import { List, Task } from "../../../shared/interfaces/collection";

export default async function handler(req: any, res: NextApiResponse) {
     const { method } = req;

     await dbConnect();

     switch (method) {
          case "POST":
               try {
                    const { collection_id, name, emoji, color } = req.body;
                    const collection = await Collection.findById(collection_id);
                    const list = { name: name, emoji: emoji, color: color };
                    collection.lists.push(list);
                    await collection.save();
                    const new_list = collection.lists[collection.lists.length - 1];
                    res.status(201).json({ success: true, data: new_list });
               } catch (error) {
                    console.log(error);
                    res.status(400).json({ success: false });
               }
               break;
          case "DELETE":
               try {
                    const { collection_id, list_id } = req.body;
                    const collection = await Collection.findById(collection_id);
                    collection.lists.pull({ _id: list_id });
                    await collection.save();
                    res.status(201).json({ success: true, data: collection });
               } catch (error) {
                    console.log(error);
                    res.status(400).json({ success: false });
               }
               break;
          case "PATCH":
               try {
                    const { collection_id, list_id, swap, name } = req.body;
                    const collection = await Collection.findById(collection_id);
                    if (typeof swap !== "undefined") {
                         const list = collection.lists.id(list_id);
                         const new_tasks = list.tasks.map((element: Task, index: number) => {
                              console.log(element);
                              return index === swap.firstIndex
                                   ? list.tasks[swap.secondIndex]
                                   : index === swap.secondIndex
                                   ? list.tasks[swap.firstIndex]
                                   : element;
                         });
                         collection.lists.id(list_id).tasks = new_tasks;
                    }
                    if (typeof name !== "undefined") collection.lists.id(list_id).name = name;
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
