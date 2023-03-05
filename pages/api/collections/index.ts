import dbConnect from "../../../lib/mongodb";
import Collection from "../../../models/collection";
import { NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
     req: any,
     res: NextApiResponse
) {
     const session = await getSession(req, res);
     const user = session?.user;

     const { method } = req;

     await dbConnect();

     switch (method) {
          case "GET":
               try {
                    const collections = await Collection.find({
                         user_id: user?.sub,
                    });
                    res.status(200).json({ success: true, data: collections });
               } catch (error) {
                    res.status(400).json({ success: false });
               }
               break;
          case "POST":
               try {
                    const collections = await Collection.create({
                         ...req.body,
                         user_id: user?.sub,
                    });
                    res.status(201).json({ success: true, data: collections });
               } catch (error) {
                    res.status(400).json({ success: false });
               }
               break;
          case "PATCH":
               try {
                    const { name, color, id } = req.body;
                    const query = { _id: id, user_id: user?.sub };
                    const new_data = { name: name, color: color };
                    const collection = await Collection.findOneAndUpdate(
                         query,
                         new_data,
                         { new: true }
                    );
                    res.status(201).json({ success: true, data: collection });
               } catch (error) {
                    res.status(400).json({ success: false });
               }
               break;
          case "DELETE":
               try {
                    const { id } = req.body;
                    const query = { _id: id, user_id: user?.sub };
                    const collection = await Collection.findByIdAndDelete(
                         query
                    );
                    res.status(201).json({ success: true, data: collection });
               } catch (error) {
                    res.status(400).json({ success: false });
               }
               break;
          default:
               res.status(400).json({ success: false });
               break;
     }
});
