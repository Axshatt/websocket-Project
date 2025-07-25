"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            });
            // console.log(socket);
        }
        if (parsedMessage.type == "chat") {
            let currentUserRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].socket == socket) {
                    currentUserRoom = allSocket[i].room;
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                // @ts-ignore
                if (allSocket[i].room == currentUserRoom) {
                    allSocket[i].socket.send(parsedMessage.payload.message);
                    console.log(parsedMessage.payload.message);
                }
            }
        }
        //     // @ts-ignore
        //     const currentUserRoom = allSocket.find((x)=>x.socket ==socket).room;
        //     //@ts-ignore
        //     let userRoom = allSocket.find((x)=> x.socket.room == currentUserRoom); 
        //     //  @ts-ignore
        //     userRoom= userRoom.socket.send(parsedMessage.payload.message)
        // // }
    });
    // allSocket.push(socket);
    // userCount = userCount+1;
    // console.log("User connected "+userCount);
    // socket.on("message",(event)=>{
    //     console.log("message received: "+event.toString());
    //     for(let i = 0;i<allSocket.length;i++){
    //         const s= allSocket[i]
    //         s.send("message from server: "+ event.toString()) 
    //     }
    // })
    // socket.on("disconnect", (event) => {
    //     // allSocket = allSocket.filter(x=>x!=socket)
    // })
});
