"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    console.log("User connected " + userCount);
    socket.on("message", (event) => {
        console.log("message received: " + event.toString());
        socket.send("nessage delivered: " + event.toString());
    });
});
