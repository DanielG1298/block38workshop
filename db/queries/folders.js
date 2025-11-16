import db from "#db/client";

//return 


export async function getFolders(){
    const sql =`SELECT * FROM folders`;
    const { rows: folders } = await db.query(sql);
    return folders;
}

export async function getFolderById(id){
const sql = `SELECT * FROM folders WHERE id = $1`;
const { rows: [ folder ]} = await db.query(sql, [id]);
return folder;
}

export async function createFolder({ name }){
    const sql = `INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *`;
    const { rows: [ folder ] } = await db.query(sql, [name]);
    return folder;
}
//this took way too long to write and figure out ngl update this 
export async function getFolderWithFilesById(id) {
  const sql = `
    SELECT * FROM folders
    LEFT JOIN files ON files.folder_id = folders.id
    WHERE folders.id  = $1`;
  const { rows: [ folder ] } = await db.query(sql, [id]);
  return folder;
}