import { test, expect } from "vitest";
import {
  helloWorld,
  checkOrCreateEnv,
  getTextFromToDoBlock,
  selectRandomAlbum,
} from "./index.js";

test('helloWorld function returns "Hello World!"', async () => {
  const result = await helloWorld();
  expect(result).toBe("Hello World!");
});

test("checkOrCreateEnv function throws error if NOTION_PAGE_ID and NOTION_API_KEY are not provided", async () => {
  const result = await checkOrCreateEnv();
  const pageId = process.env.NOTION_PAGE_ID;
  const apiKey = process.env.NOTION_API_KEY;
  if (!pageId || !apiKey) {
    expect(result).toThrowError(
      "Please provide NOTION_PAGE_ID and NOTION_API_KEY"
    );
  }
});

test("getTextFromToDoBlock function returns text from unchecked ToDo block", () => {
  const block = {
    type: "to_do",
    to_do: { checked: false, rich_text: [{ plain_text: "Task 1" }] },
  };
  const text = getTextFromToDoBlock(block);
  expect(text).toBe("Task 1");
});

test("getTextFromToDoBlock function returns null for checked ToDo block", () => {
  const block = {
    type: "to_do",
    to_do: { checked: true, rich_text: [{ plain_text: "Task 2" }] },
  };
  const text = getTextFromToDoBlock(block);
  expect(text).toBeNull();
});

// test("selectRandomAlbum returns a random album from the list", async ({
//   expect,
// }) => {
//   const mockedContent = JSON.stringify([
//     { blockId: "blockId 1", text: "Text 1" },
//     { blockId: "blockId 2", text: "Text 2" },
//     { blockId: "blockId 3", text: "Text 3" },
//   ]);

//   const mockedParsedContent = JSON.parse(mockedContent);
//   const randomMockedItemNumber = Math.floor(
//     Math.random() * mockedParsedContent.length
//   );
//   const randomMockedItem = mockedParsedContent[randomMockedItemNumber];
//   expect(randomMockedItem).toEqual(
//     await selectRandomAlbum(mockedContent, randomMockedItemNumber)
//   );
// });
