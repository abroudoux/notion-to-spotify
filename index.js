import { Client, iteratePaginatedAPI } from "@notionhq/client";
import { config } from "dotenv";

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

const printToDoBlocks = async () => {
  const todoBlocks = await retrieveToDoBlocks(pageId);
  console.log("Displaying ToDo blocks:");
  for (const block of todoBlocks) console.log(block);
};

printToDoBlocks();
