import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    // Broadcast the same message to all clients
    io.emit("messageBackend", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Serve the chat UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

server.listen(3000, () => {
  console.log("Server listening at port 3000!");
});
