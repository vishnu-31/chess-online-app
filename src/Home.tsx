import { useState } from "react";
import { Socket } from "socket.io-client";



type HomeProps = {
    playerName:string;
    setPlayerName:React.Dispatch<string>;
    room:string;
    setRoom:React.Dispatch<string>;
    toChoose:boolean;
    socket:Socket;
    chooseColor:CallableFunction;
}

export const Home = ({playerName, setPlayerName, toChoose, socket, chooseColor, room, setRoom}:HomeProps) =>{
    const [nameDataLoaded, setNameDataLoaded] = useState<boolean>(false);
    const submitHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        setNameDataLoaded(true);
        socket.emit("checkRoom", room, playerName);
    }
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            {(!nameDataLoaded && !toChoose)?
            <form className="flex-col md:flex">
                <label htmlFor="player" className="block text-lg">Player: 
                    <input className="border-2 p-3 m-2" type="text" name="player" id="player" required onChange={(e)=>setPlayerName(e.target.value)} value={playerName}/>
                </label>
                <label htmlFor="room" className="block text-lg">Room Code: 
                    <input className="border-2 p-3 m-2" type="text" name="room" id="room" required onChange={(e)=>setRoom(e.target.value)} value={room} />
                </label>
                <button type="submit" className=" border-2 bg-green-700 rounded-lg p-3 text-white" onClick={submitHandler}>Join Room</button>
            </form>
            :null}
            {toChoose?
            <div className="w-full h-full flex justify-center">
                <div 
                    className=" bg-white text-black text-center uppercase text-xl md:text-3xl p-3 flex justify-center items-center w-[45%] h-full border-3 rounded-lg"
                    onClick={() => {
                        chooseColor("white");
                    }}
                    >White</div>
                <div
                    onClick={() => {
                        chooseColor("black");
                    }}
                    className="bg-black text-white text-xl text-center uppercase md:text-3xl p-3 flex justify-center items-center w-[45%] h-full border-3 rounded-lg"
                    >Black</div>
            </div>
            :null}
        </div>
    );
}