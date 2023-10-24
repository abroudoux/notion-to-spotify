import { writeFile } from 'fs';


async function write(albumsText) {
    try {
        writeFile('albums.txt', albumsText, 'utf8', () => {
            console.log("File written successfully");
        });
    } catch (err) {
        console.error("Can't write the file : ", err);
    };
};


export { write };
