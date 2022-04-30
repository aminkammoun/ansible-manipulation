console.log("welcome to ansible manipulation");
const { exec } = require("child_process");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("openApache", (msg) => {
    console.log("openning apache ...");
    exec(
      "cd systemdmanager && ansible-playbook apache.yml",
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  });
});

/*  */
server.listen(3000, () => {
  console.log("listening on *:3000");
});
