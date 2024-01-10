import { useState } from 'react';
import './App.css';
import { Home } from './Home';
import CustomChessBoard from "./CustomChessBoard"
import { NavBar } from './NavBar';
import { RightColumn } from "./RightColumn";
import { Chess } from 'chess.js';
import { io, Socket } from "socket.io-client";

export type colorType = "white" | "black";

function App() {
    const [chess] = useState(new Chess());
    const [over, setOver] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>("");
    const [opponentName, setOpponentName] = useState<string>("");
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [color, setColor] = useState<colorType>("white");
    const [toChoose, setToChoose] = useState<boolean>(false);
    const [ isRoomFull, setIsRoomFull] = useState<boolean>(false);
    const [room, setRoom] = useState<string>("");
    const [socket] = useState<Socket>(io("http://localhost:3000"));
    
    const chooseColor =(color:colorType) =>{
        setColor(color);
        setToChoose(false);
        setDataLoaded(true);
        socket.emit("putColor", {playerName:playerName, color:color})
    }

        socket.on("roomFull", ()=>{
            setIsRoomFull(true);
        });

        socket.on("setColor", (color)=>{
            setColor(color);
            setDataLoaded(true);
        });

        socket.on("chooseColor", ()=>{
            setToChoose(true);
        });

        socket.on("opponentName", (opponentName) =>{
            setOpponentName(opponentName);
        });

    return (
        <div className="justify-center h-full w-full">
            <NavBar/> 
            {!dataLoaded?

                isRoomFull?
                <div 
                    className=' flex w-full h-full bg-gray-500 text-red-600 font-bold text-3xl text-center items-center'
                    >Room is full</div>
                :

                <Home 
                    playerName={playerName}
                    setPlayerName={setPlayerName} 
                    room={room} 
                    opponentName= {opponentName}
                    setRoom={setRoom} 
                    toChoose={toChoose}
                    setDataLoaded={setDataLoaded}
                    setToChoose={setToChoose}
                    chooseColor={chooseColor}/> 
            :
                <div className="flex w-full min-h-screen">
                {over?
                <div className='w-full h-16 bg-green-300 text-center font-semibold text-xl'>Match Over</div>:null}
                
                    <main className="flex flex-col w-full md:h-full md:flex-row px-5 pt-1">
                        <CustomChessBoard chess={chess} color={color}  socket={socket} setOver={setOver}/>
                        <RightColumn playerName={playerName} room={room} opponentName={opponentName} color={color} />
                    </main>
                </div>
            }
        </div>
    )
}

export default App;
