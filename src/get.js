import * as url from 'url';
import { Client } from "@notionhq/client";
import { writeFileSync } from "fs";
import { join } from "path";
import {} from "dotenv/config";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function get() {

    async function getBlocks(block_id) { 

        try {
            let { results: children } = await notion.blocks.children.list({ block_id });

            for ( const child of children ) {
                const grandChildren = await getBlocks(child.id);
                child.children = grandChildren;
            };
            return children;
        } catch (err) {
            console.log('Error function getBlocks :', err);
        };

    };

    async function importPages() {

        try {
            let { results: pages } = await notion.databases.query({
                database_id: process.env.NOTION_DATABASE_ID,
            });

            for ( const page of pages ) {
                const blocks = await getBlocks(page.id);
                page.children = blocks ;
            };

            const outputFile = join(__dirname, "../exports/notion-export.json");
            writeFileSync(outputFile, JSON.stringify(pages, null, 2));

            console.log('Import successful');
        } catch (err) {
            console.log('Error function importPages :', err);
        };
    };

    await importPages();
};


export { get };

