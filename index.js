import { Client, iteratePaginatedAPI } from "@notionhq/client";
import { config } from "dotenv";
import { promises as fsPromises } from "fs";
import { exec } from "child_process";

config();

const pageId = process.env.NOTION_PAGE_ID;
const apiKey = process.env.NOTION_API_KEY;

export const helloWorld = async () => {
  return "Hello World!";
};

export const checkOrCreateEnv = async () => {
  if (!pageId || !apiKey) {
    throw new Error("Please provide NOTION_PAGE_ID and NOTION_API_KEY");
  }
};

const notion = new Client({ auth: apiKey });

export const getTextFromToDoBlock = (block) => {
  if (block.type !== "to_do") return null;
  const todoText = block.to_do.rich_text.map((t) => t.plain_text).join("");
  return block.to_do.checked ? null : todoText;
};

export async function retrieveToDoBlocks(id) {
  console.log("Retrieving Unchecked ToDo blocks...");
  const todoBlocks = [];
  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: id,
  })) {
    const text = getTextFromToDoBlock(block);
    if (text !== null) todoBlocks.push({ blockId: block.id, text });
  }
  return todoBlocks;
}

const saveToDoBlocksUncheckedJson = async () => {
  const todoBlocks = await retrieveToDoBlocks(pageId);
  console.log("Saving unchecked ToDo blocks to file...");
  await fsPromises.writeFile(
    "albums.json",
    JSON.stringify(todoBlocks, null, 2)
  );
};

export const selectRandomAlbum = async () => {
  console.log("Selecting random album...");
  const content = await fsPromises.readFile("albums.json", "utf-8");
  const albums = JSON.parse(content);
  const randomAlbumNumber = Math.floor(Math.random() * albums.length);
  const randomAlbum = albums[randomAlbumNumber];
  return randomAlbum;
};

const toggleShuffle = () => {
  return new Promise((resolve, reject) => {
    exec("spotify toggle shuffle", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }

      const isShuffleActive = stdout.includes("Spotify shuffling set to true");

      if (isShuffleActive) {
        exec("spotify toggle shuffle", (error) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            reject(error);
            return;
          }
          resolve("Shuffle activated");
        });
      } else {
        resolve("Shuffle deactivated");
      }
    });
  });
};

const toggleRepeat = () => {
  return new Promise((resolve, reject) => {
    exec("spotify toggle repear", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }

      const isShuffleActive = stdout.includes("Spotify repeating set to true");

      if (isShuffleActive) {
        exec("spotify toggle reapeat", (error) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            reject(error);
            return;
          }
          resolve("Repeat activated");
        });
      } else {
        resolve("Reapeat deactivated");
      }
    });
  });
};

export const playRandomAlbum = async (randomAlbum) => {
  const randomAlbumString = randomAlbum.replace(" - ", " by");
  console.log(`Playing ${randomAlbumString}`);
  const albumName = randomAlbum.replace(/.* - /, "");
  exec(`spotify play album ${albumName}`);
};

const markToDoAsChecked = async (blockId) => {
  await notion.blocks.update({
    block_id: blockId,
    to_do: { checked: true },
  });
};

const main = async () => {
  await checkOrCreateEnv();
  // await saveToDoBlocksUncheckedJson();
  // const randomAlbum = await selectRandomAlbum();
  // const { blockId, text } = randomAlbum;
  // await toggleShuffle();
  // await toggleRepeat();
  // await markToDoAsChecked(blockId);
  // await playRandomAlbum(text);
};

main();
