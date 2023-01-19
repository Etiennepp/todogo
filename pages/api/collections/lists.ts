import dbConnect from "../../../lib/mongodb";
import { NextApiResponse } from "next";
import Collection from "../../../models/collection";
import { Task } from "../../../shared/interfaces/collection";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req: any, res: NextApiResponse) {
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
                    const { collection_id, list_id, move_list, move, name, color, emoji } = req.body;
                    const collection = await Collection.findById(collection_id);
                    if (typeof move_list !== "undefined") {
                         const lists = collection.lists;
                         let new_lists = [...lists];
                         new_lists.splice(move_list.source, 1);
                         new_lists.splice(move_list.destination, 0, { ...lists[move_list.source] });
                         collection.lists = new_lists;
                    }
                    if (typeof move !== "undefined") {
                         const tasks = collection.lists.id(list_id).tasks;
                         let new_tasks_list = [...tasks];
                         new_tasks_list.splice(move.source, 1);
                         new_tasks_list.splice(move.destination, 0, { ...tasks[move.source] });
                         collection.lists.id(list_id).tasks = new_tasks_list;
                    }
                    if (typeof name !== "undefined") collection.lists.id(list_id).name = name;
                    if (typeof color !== "undefined") collection.lists.id(list_id).color = color;
                    if (typeof emoji !== "undefined") collection.lists.id(list_id).emoji = emoji;
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
});
