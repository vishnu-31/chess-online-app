import { useState } from "react";



type HomeProps = {
    playerName:string;
    setPlayerName:React.Dispatch<string>;
    room:string;
    setRoom:React.Dispatch<string>;
    toChoose:boolean;
    opponentName:string;
    setDataLoaded:React.Dispatch<boolean>;
    setToChoose:React.Dispatch<boolean>;
    chooseColor:CallableFunction;
}

export const Home = ({playerName, setPlayerName, toChoose, opponentName, setDataLoaded, setToChoose, chooseColor, room, setRoom}:HomeProps) =>{
    const [nameDataLoaded, setNameDataLoaded] = useState<boolean>(false);
    const submitHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        setNameDataLoaded(true);
        if(opponentName==""){
            setToChoose(true);
        }
        else{
            setDataLoaded(true);
        }
    }
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            {(!nameDataLoaded && !toChoose)?
            <form >
                <label htmlFor="player">Player: </label>
                <input className="border-2 p-3 m-2" type="text" name="player" id="player" required onChange={(e)=>setPlayerName(e.target.value)} value={playerName}/>
                <label htmlFor="room">Room Code: </label>
                <input className="border-2 p-3 m-2" type="text" name="room" id="room" required onChange={(e)=>setRoom(e.target.value)} value={room} />
                <button type="submit" className=" border-2 bg-green-700 rounded-lg p-3 text-white" onClick={submitHandler}>Create Room</button>
            </form>
            :null}
            {toChoose?
            <div className="w-full h-full flex justify-center">
                <button 
                    className=" bg-white text-black p-3 flex justify-center items-center h-full border-3 rounded-lg"
                    onClick={() => {
                        chooseColor("white");
                    }}
                    >White</button>
                <button 
                    onClick={() => {
                        chooseColor("black");
                    }}
                    className="bg-black text-white p-3 flex justify-center items-center h-full border-3 rounded-lg"
                    >Black</button>
            </div>
            :null}
        </div>
    );
}