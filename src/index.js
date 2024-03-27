import { Client, iteratePaginatedAPI } from "@notionhq/client";
import { config } from "dotenv";
import { promises as fsPromises } from "fs";

config();

const pageId = process.env.NOTION_PAGE_ID;
const apiKey = process.env.NOTION_API_KEY;

const notion = new Client({ auth: apiKey });

const getTextFromToDoBlock = (block) => {
  if (block.type !== "to_do") return null;
  const todoText = block.to_do.rich_text.map((t) => t.plain_text).join("");
  return `${todoText} ${block.to_do.checked ? "(Checked)" : "(Unchecked)"}`;
};

async function retrieveToDoBlocks(id) {
  console.log("Retrieving ToDo blocks (async)...");
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
  const uncheckedBlocks = todoBlocks.filter(
    (block) => !block.includes("(Checked)")
  );
  const modifiedBlocks = uncheckedBlocks.map((block) =>
    block.replace(" (Unchecked)", "")
  );
  await fsPromises.writeFile(
    "albums.json",
    JSON.stringify(modifiedBlocks, null, 2)
  );
};

const selectRandomAlbum = async () => {
  const content = await fsPromises.readFile("albums.json", "utf-8");
  const albums = JSON.parse(content);
  const randomAlbumNumber = Math.floor(Math.random() * albums.length);
  const randomAlbum = albums[randomAlbumNumber];
  console.log(randomAlbum);
};

const main = async () => {
  await saveToDoBlocksUncheckedJson();
  await selectRandomAlbum();
};

main();
