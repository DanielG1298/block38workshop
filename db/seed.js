import db from "#db/client";
import { faker} from "@faker-js/faker";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

//seed functions to seed 3 folders//
async function seed() {
  const folderIds = [];

  
  for (let i = 0; i < 3; i++) {
    const folderData = {
      name: faker.system.fileName(),
    };

    const folder = await createFolder(folderData);
    folderIds.push(folder.id);
  }

  
  await seedFiles(folderIds);
}

// Seed at least 5 files for EACH folder
async function seedFiles(folderIds) {
  for (const folderId of folderIds) {
    for (let i = 0; i < 5; i++) {
      await createFile({
        name: faker.system.fileName(),
        size: faker.number.int({ min: 100, max: 500 }),
        folder_id: folderId,
      });
    }
  }
}