"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSocket = [];
let userCount = 0;
wss.on("connection", (socket) => {
    allSocket.push(socket);
    userCount = userCount + 1;
    console.log("User connected " + userCount);
    socket.on("message", (event) => {
        console.log("message received: " + event.toString());
        for (let i = 0; i < allSocket.length; i++) {
            const s = allSocket[i];
            s.send("message from server: " + event.toString());
        }
    });
    socket.on("disconnect", (event) => {
        allSocket = allSocket.filter(x => x != socket);
    });
});
