import { readFile } from 'fs';
import { write } from "../write/write.js"


async function read() {
    readFile('exports/notion-export.json', 'utf8', (err, data) => {
        try {
            const jsonContent = JSON.parse(data);
            const filteredData = jsonContent.filter(item => item.properties.Listened.checkbox === false);
            const albumsText = filteredData.map(item => `${item.properties.Title.title[0].plain_text} - ${item.properties.Artist.rich_text[0].plain_text}`).join('\n');
            write(albumsText);
        } catch (err) {
            console.error("Can't read the file : ", err);
            return;
        };
    });
};

export { read };

