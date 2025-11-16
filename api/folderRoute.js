import express from "express";
const folderRouter = express.Router();
import { getFilesByFolderId } from "#db/queries/files";
import { getFolders,getFolderById, createFolder,getFolderById,getFolderWithFilesById } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

// folder route 
folderRouter.get("/", async (req, res) => {
  const folders = await getFolders();
  return res.status(200).send(folders);
});

folderRouter.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: "Name is required" });
  }
  const folder = await createFolder({ name });
  return res.status(201).send(folder);
});
// I did something wrong but i dont know what yet //
folderRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const folder = await getFolderById(id);
  if (!folder) {
    return res.status(404).send({ error: "Folder not found" });
  }
  const files = await getFilesByFolderId(id);
  folder.files = files;
  return res.status(200).send(folder);
});

folderRouter.post("/:id/files", async (req, res) => {
  const { id: folder_id } = req.params;
  const folderExists = await getFolderById(folder_id);
  if (!folderExists) {
    return res.status(404).send({ error: "Folder not found" });
  }
  if(!req.body){
    return res.status(400).send({ error: "Request body required" });
  }
  const { name, size } = req.body;
  if (!name || size == null) {
    return res.status(400).send({ error: "Name and size are required" });
  }
  const file = await createFile({ name, size, folder_id });
  return res.status(201).send(file);
}); 









export default folderRouter;