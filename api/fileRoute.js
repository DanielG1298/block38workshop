import express from "express";
const fileRouter = express.Router();

import { createFile, getFiles, getFileById, getfilesByfolderId } from "#db/queries/files";

// file routes//
fileRouter.get('/', async (req, res, next) =>{
    const files = await getFiles();
    res.status(200).send(files);
})
.post("/", async (req,res) =>{
    const { name, size, folder_id} = req.body;
    if (!name|| !size || !folder_id) {
        return res.status(400).send({error:"missing required fields"})
    }

    const file = await createFile({ name, size, folder_id});
    return res.status(201).send(file);
});










export default fileRouter;