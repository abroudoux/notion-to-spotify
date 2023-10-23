const { exec } = require("child_process");

exec("bash scripts/play.sh", (error, stdout, stderr) => {
  if (error) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
});


// const get = require("./src/get.js");
// const read = require("./src/read.js");
// const play = require("./src/play.js");

// async function playScripts() {
//     try {
//         await get();
//         await read();
//         await play();
//     } catch (err) {
//         console.error(err);
//         process.exit(1); 
//     }
// };

// playScripts();