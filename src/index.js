import { Client, iteratePaginatedAPI } from "@notionhq/client";
import { config } from "dotenv";
import { promises as fsPromises } from "fs";
import { exec } from "child_process";

config();

const pageId = process.env.NOTION_PAGE_ID;
const apiKey = process.env.NOTION_API_KEY;

const notion = new Client({ auth: apiKey });

const getTextFromToDoBlock = (block) => {
  if (block.type !== "to_do") return null;
  const todoText = block.to_do.rich_text.map((t) => t.plain_text).join("");
  return block.to_do.checked ? null : todoText;
};

async function retrieveToDoBlocks(id) {
  console.log("Retrieving Unchecked ToDo blocks...");
  const todoBlocks = [];
  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: id,
  })) {
    const text = getTextFromToDoBlock(block);
    if (text !== null) todoBlocks.push(text);
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

const selectRandomAlbum = async () => {
  console.log("Selecting random album...");
  const content = await fsPromises.readFile("albums.json", "utf-8");
  const albums = JSON.parse(content);
  const randomAlbumNumber = Math.floor(Math.random() * albums.length);
  const randomAlbum = albums[randomAlbumNumber];
  console.log("Random album is: ", randomAlbum);
  return randomAlbum;
};

const playRandomAlbum = async () => {
  console.log("Playing random album...");
  const randomAlbum = await selectRandomAlbum();
  const albumName = randomAlbum.replace(/.* - /, "");
  // console.log("Album Name : ", albumName);
  exec(`spotify play album ${albumName}`);
};

const main = async () => {
  await saveToDoBlocksUncheckedJson();
  await selectRandomAlbum();
  await playRandomAlbum();
};

main();
