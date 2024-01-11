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
    const [status, setStatus] = useState<string>("playing");
    const [isAborted, setIsAborted] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>("");
    const [opponentName, setOpponentName] = useState<string>("");
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [color, setColor] = useState<colorType>("white");
    const [toChoose, setToChoose] = useState<boolean>(false);
    const [ isRoomFull, setIsRoomFull] = useState<boolean>(false);
    const [room, setRoom] = useState<string>("");
    const [socket] = useState<Socket>(io(import.meta.env.VITE_SOCKET_SERVER_URL));
    
    const chooseColor =(color:colorType) =>{
        setColor(color);
        setToChoose(false);
        setDataLoaded(true);
        socket.emit("putColor", {playerName:playerName, color:color})
    }

        socket.on("win", ()=>{
            setStatus("lose");
        })

        socket.on("abort", ()=>{
            setIsAborted(true);
        })

        socket.on("roomFull", ()=>{
            setIsRoomFull(true);
            console.log("roomfull");
        });

        socket.on("setColor", (color)=>{
            console.log("setColor", color);
            setColor(color);
            setDataLoaded(true);
        });

        socket.on("chooseColor", ()=>{
            console.log("chooseColor");
            setToChoose(true);

        });

        socket.on("opponentName", (opponentName) =>{
            setOpponentName(opponentName);
            console.log("opponentName", opponentName);
        });

    return (
        <div className="justify-center h-full w-full">
            <NavBar/> 
            {isAborted?

            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className='text-center text-xl font-semibold'>{opponentName} has quit the Game....</div>
                <button className='bg-black text-white text-xl rounded-lg border-white border-3 py-1 px-3'>Close the Game</button>
            </div>

            : !dataLoaded?

                isRoomFull?
                <div 
                    className=' flex w-full h-full bg-gray-500 text-red-600 font-bold text-3xl text-center items-center'
                    >Room is full</div>
                :

                <Home 
                    playerName={playerName}
                    setPlayerName={setPlayerName} 
                    room={room} 
                    socket={socket}
                    setRoom={setRoom} 
                    toChoose={toChoose}
                    chooseColor={chooseColor}/> 
            :
                <div className="flex w-full min-h-screen">
                {status=="lose"?
                <div className='w-full h-16 bg-green-300 text-center font-semibold text-xl'>Oh nooo... You have been Destroyed by {opponentName}</div>:
                status=="win"?
                <div className='w-full h-16 bg-green-300 text-center font-semibold text-xl'>WIN!!!!. You have Destroyed {opponentName}'s Kingdom!</div>:null
                }
                
                    <main className="flex flex-col w-full md:h-full md:flex-row px-5 pt-1">
                        <CustomChessBoard chess={chess} color={color}  socket={socket} setStatus={setStatus}/>
                        <RightColumn playerName={playerName} room={room} opponentName={opponentName} color={color} />
                    </main>
                </div>
            }
        </div>
    )
}

export default App;
