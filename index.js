const { exec } = require("child_process");

exec("bash scripts/play.sh", (error, stdout, stderr) => {
  if (error) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
});
