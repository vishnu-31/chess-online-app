import { Chat } from "./Chat"
import PlayerCard from "./PlayerCard"
import { Timer } from "./Timer"


export const RightColumn = () =>{
    return(
        <div className="h-full flex flex-col justify-between md:ml-3 p-3 w-full md:w-[50%]  bg-gray-200">
            <div className=" text-center uppercase font-bold text-lg"> Players</div>
            <div className="flex flex-col md:flex-row justify-around items-center ">
                <PlayerCard avatar={"vite.svg"} name={"Robert"}  color={"white"}/>
                <PlayerCard avatar={"vite.svg"} name={"Steve"} color={"black"}/>
            </div>
            <div className="flex justify-center items-center">
                <Timer/>
            </div>
            <Chat/>
            
        </div>
    )
} 