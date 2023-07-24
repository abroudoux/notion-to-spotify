const { promises: fsPromises } = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const { exec, execFile, spawn } = require('node:child_process');

let AlbumChoosen;

async function readFile(filename) {
    try {
        let contents = await fsPromises.readFile(filename, 'utf-8');
        contents = contents.replace(/"/g, '');
        Albums = contents.split(/\r?\n/);

        // test
        // console.log(Albums);

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

        // test
        // console.log(AlbumChoosen);

        return AlbumChoosen;
    } catch (err) {
        console.log(err);
    };
};

async function launchSpotify() {
    try {
        await chooseAlbum();

        // test
        // console.log(`test 1 ${AlbumChoosen}`);

        // let command = `spotify shuffle off && spotify play album ${AlbumChoosen}`;
        let command = `spotify play album Atlas`;

        exec(command, (err, output) => {
            if (err) {
                console.error("could not execute command: ", err)
                return
            };
            console.log("Output: \n", output)
            console.log(`Vous écoutez actuellement : ${AlbumChoosen}`)
        });

        // let command = 'spotify';
        // let args = ['play', 'artist', 'SZA'];

        // const childProcess = spawn(command, args);
        // // const childProcess = spawn('find', ['.']);

        // childProcess.stdout.on('data', (data) => {
        //     console.log('Output:', data.toString());
        // i});

        // childProcess.stderr.on('data', (data) => { 
        //     console.error('Error:', data.toString());
        // });

        // childProcess.on('error', (err) => {
        //     console.error('Spawn Error:', err);
        // });

        // childProcess.on('close', (code) => {
        //     console.log('Child process exited with code', code);
        //     console.log('Vous écoutez actuellement:', AlbumChoosen);
        // });
    } catch (err) {
        console.log(err);
    };
};

launchSpotify().catch((error) => {
    console.error('Une erreur s\'est produite :', error);
});
