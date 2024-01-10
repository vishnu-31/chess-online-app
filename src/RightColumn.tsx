import PlayerCard from "./PlayerCard"
import { colorType } from "./App"


export const RightColumn = ({playerName, color, opponentName, room}:{playerName:string; color:colorType; opponentName:string; room:string}) =>{
    return(
        <div className="h-full flex flex-col justify-between md:ml-3 p-3 w-full md:w-[50%]  bg-gray-200">
            <div className=" text-center uppercase font-bold text-lg"> Players</div>
            <div className="flex flex-col md:flex-row justify-around items-center ">
                <PlayerCard avatar={"vite.svg"} name={playerName}  color={color}/>
                <PlayerCard avatar={"vite.svg"} name={opponentName==""?"player":opponentName} color={color =="white"?"black":"white"}/>
            </div>
            <div className="flex text-center text-3xl font-semibold justify-center items-center">
               Room Code: {room} 
            </div>            
        </div>
    )
} 