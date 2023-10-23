const { get } = require("./src/get.js");
const { read } = require("./src/read.js");
const { play } = require("./src/play.js");


async function playScripts() {
    try {
        await get();
        await read();
        await play();
    } catch (err) {
        console.log(err);
    };
};

playScripts();
