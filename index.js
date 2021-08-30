const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
