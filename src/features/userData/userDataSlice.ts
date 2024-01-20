import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { Chess } from "chess.js";

interface UserDataState {
    chess: any;
    playerName: string;
    opponentName: string;
    status:string;
    color: "white" | "black";
    socket: Socket;
    room: string;
}

const initialState: UserDataState ={
     chess: new Chess(),
     playerName:"",
     opponentName:"",
     status:"playing",
     color:"white",
     socket:io(import.meta.env.VITE_SOCKET_SERVER_URL),
     room:""
    }

const userDataSlice = createSlice({
    name:"userData",
    initialState,
    reducers:{
        setStatus(state,action:PayloadAction<string>){
            state.status = action.payload;
        },
        setPlayerName(state, action:PayloadAction<string>) {
                state.playerName= action.payload;
        },
        setOpponentName(state, action:PayloadAction<string>) {
                state.playerName= action.payload;
        },
        setColor(state,action:PayloadAction<"white"|"black">){
            state.color = action.payload;
        },
        setRoom(state, action:PayloadAction<string>){
            state.room = action.payload;
        }
    }
});


export const {setColor, setStatus, setOpponentName, setPlayerName, setRoom } = userDataSlice.actions;


export default userDataSlice.reducer;