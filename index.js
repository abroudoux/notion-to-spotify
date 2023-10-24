import { get } from "./src/get/get.js";
import { read } from "./src/read/read.js";
import { play } from "./src/play/play.js";


async function playScripts() {
    try {
        await get();
        await read();
        await play();
    } catch (err) {
        console.log(err);
    };
};

playScripts().catch((err) => {
    console.error(err);
});
