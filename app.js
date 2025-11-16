import express from "express";
const app = express();
import fileRouter from "#api/fileRoute";
import folderRouter from "#api/folderRoute";

app.use(express.json())

// routes for file/folder
app.use("/folders", folderRouter);
app.use("/files", fileRouter);


app.use((err,req,res, next) =>{
    console.error(err);
    res.status(500).send("error has occured");
})



export default app;


