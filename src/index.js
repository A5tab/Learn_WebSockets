import express from "express";
import http from "http";
import path from "path";
import {Server} from "socket.io";
const app = express();
const server = http.createServer(app)
const io = new Server(server)

const __dirname = import.meta.dirname;

io.on("connection", (socket) => {
    console.log("user connnected!")
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

server.listen(3000, () => {
    console.log("Server lsitening at port 3000!");
})
