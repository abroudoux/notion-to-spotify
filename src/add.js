const dotenv = require('dotenv');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

dotenv.config();

async function addToDatabase(databaseId, title, artist, status) {
    try {
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                'Title': {
                    type: 'title',
                    title: [
                    {
                        type: 'text',
                        text: {
                            content: title,
                        },
                    },
                    ],
                },
                'Artist' : {
                    type: 'rich_text',
                    rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: artist,
                        },
                    }
                    ],
            },
                'Seen': {
                    type: 'checkbox',
                    checkbox: status
                },
            }
        });
        console.log(response);
    } catch (error) {
        console.error(error.body);
    };
};

if ( process.argv.length === 5 ) {
    const title = process.argv[2];
    const artist = process.argv[3];
    const status = process.argv[4] === 'true' || 'false';

    addToDatabase(databaseId, title, artist, status);
} else {
    console.error('Veuillez fournir les 3 arguments nécessaires: title, artist, status');
};
