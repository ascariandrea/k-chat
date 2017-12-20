const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let sockets = [];
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on('new-message', data => io.emit('new-message', data));
  socket.on('username-updated', data => io.emit('username-updated', data));

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
