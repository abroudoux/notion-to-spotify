const { promises: fsPromises } = require('fs');
const { exec } = require('node:child_process');

let AlbumChoosen;


async function play() {

    async function readFile(filename) {
        try {
            let contents = await fsPromises.readFile(filename, 'utf-8');
            contents = contents.replace(/"/g, '');
            Albums = contents.split(/\r?\n/);

            // Debug
            // console.log('Albums :', Albums);

            return Albums;
        } catch (err) {
            console.log(err);
        };
    };

    async function chooseAlbum() {
        try {
            await readFile('./albums.txt');

            let numberLine = Math.floor(Math.random() * (Albums.length - 1));
            AlbumChoosen = Albums[numberLine];

            // Debug
            // console.log('Album choosen :', AlbumChoosen);

            return AlbumChoosen;
        } catch (err) {
            console.log(err);
        };
    };

    async function launchSpotify() {
        try {
            await chooseAlbum();

            let AlbumPlayed = AlbumChoosen.replace(/&/g, '');

            let command = `spotify play album ${AlbumPlayed}`;

            exec(command, (err, output) => {
                if (err) {
                    console.error("could not execute command: ", err)
                    return
                };
                console.log(output)
                console.log(`You're listening : ${AlbumPlayed}`)
            });

        } catch (err) {
            console.log(err);
        };
    };

    launchSpotify().catch((err) => {
        console.error(err);
    });

};


module.exports = { play };