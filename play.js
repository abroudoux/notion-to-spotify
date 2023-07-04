const { promises: fsPromises } = require('fs');
const { exec } = require('node:child_process')

let AlbumChoosen;

async function readFile(filename) {
    try {
        let contents = await fsPromises.readFile(filename, 'utf-8');
        contents = contents.replace(/"/g, '');
        Albums = contents.split(/\r?\n/);

        // test
        console.log(Albums);

        return Albums;
    } catch (err) {
        console.log(err);
    };
};

async function chooseAlbum() {
    try {
        const Albums = await readFile('./albums.txt');

        let numberLine = Math.floor(Math.random() * (Albums.length));
        AlbumChoosen = Albums[numberLine];

        // test
        console.log(AlbumChoosen);

        return AlbumChoosen;
    } catch (err) {
        console.log(err);
    };
};

async function launchSpotify() {
    try {
        exec(`spotify play album ${AlbumChoosen}`, (err) => {
            if (err) {
                console.error("could not execute command: ", err)
                return
            };
        });
        exec('ls ./', (err, output) => {
            if (err) {
                console.error("could not execute command: ", err)
                return
            }
            console.log("Output: \n", output)
        })
    } catch (err) {
        console.log(err);
    };
};

chooseAlbum();
launchSpotify();
