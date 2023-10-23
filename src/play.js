
const { promises: fsPromises } = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const { exec, execFile, spawn } = require('node:child_process');


let AlbumChoosen;

async function readFile(filename) {
    try {
        let contents = await fsPromises.readFile(filename, 'utf-8');
        contents = contents.replace(/"/g, '');
        Albums = contents.split(/\r?\n/);

        // Debug
        console.log('Albums :', Albums);

        return Albums;
    } catch (err) {
        console.log(err);
    };
};

async function chooseAlbum() {
    try {
        await readFile('./albums.txt');

        let numberLine = Math.floor(Math.random() * (Albums.length));
        AlbumChoosen = Albums[numberLine];

        // Debug
        console.log('Album choisi :', AlbumChoosen);

        return AlbumChoosen;
    } catch (err) {
        console.log(err);
    };
};

async function launchSpotify() {
    try {
        await chooseAlbum();

        // Debug
        console.log(AlbumChoosen);

        let command = `spotify play album ${AlbumChoosen}`;

        exec(command, (err, output) => {
            if (err) {
                console.error("could not execute command: ", err)
                return
            };
            console.log("Output: \n", output)
            console.log(`Vous écoutez actuellement : ${AlbumChoosen}`)
        });

    } catch (err) {
        console.log(err);
    };
};

launchSpotify().catch((error) => {
    console.error('Une erreur s\'est produite :', error);
});
