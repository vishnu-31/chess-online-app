import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

export const app = express();
const server = createServer(app);
const io = new Server(server,{cors:{
    origin:"*",
    methods:["GET","POST"]
}});

const socketData = {
        name:"Game Data",
        p1:{name:"", color:"", socketId:""},
        p2:{name:"", color:"", socketId:""},
    };

io.on('connection', (socket) => {


  socket.on("win", ()=>{
    socket.broadcast.emit("win")
  })

  socket.on("checkRoom", (room, pname) =>{

    let opponentName ="";

    if(!socketData.p1.name =="" && !socketData.p2.name==""){
      socket.emit("roomFull");
      return
    }
    else if(socketData.p1.name =="" && socketData.p2.name==""){
      socketData.p1.name= pname;
      socketData.p1.socketId = socket.id;
      opponentName = socketData.p2.name;
      socketData.name=room;
      socket.join(room);
      socket.emit("chooseColor");
    }else{
      let otherColor="";
      if(!socketData.p1.name ==""){
        opponentName = socketData.p1.name;
        socketData.p2.name=pname;
        socketData.p2.socketId = socket.id;
        if (socketData.p1.color =="white"){
          otherColor="black";
        }else if(socketData.p1.color=="black"){
          otherColor="white";
        }
      }
      socket.emit("setColor",otherColor)
      socket.broadcast.emit("opponentName", pname);
      socket.emit("opponentName",opponentName); 
    }
    
  })

  socket.on("putColor", ({playerName, color})=>{
    if(socketData.p1.name== playerName){
      socketData.p1.color=color;
    }
    else if(socketData.p2.name ==playerName){
      socketData.p2.color=color;
    }
  })

  socket.on("move", (data)=>{
    //console.log("move", data);
      socket.broadcast.emit("move", data);
  })

  socket.on("disconnect", () =>{
    const socketList = io.in(socketData.name).fetchSockets();
    if (socketList.length >0){
      socket.broadcast.emit("abort");
    } 
    io.socketsLeave(socketData.name);
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});