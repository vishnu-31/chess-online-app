import PlayerCard from "./PlayerCard"
import { Timer } from "./Timer"


export const RightColumn = () =>{
    return(
        <div className="h-[100%] flex flex-col ml-3 p-3 w-[50%] mx-auto bg-green-300">
            Players
            <div className="flex justify-around">
                <PlayerCard avatar={"vite.svg"} name={"Robert"}  color={"white"}/>
                <PlayerCard avatar={"vite.svg"} name={"Steve"} color={"black"}/>
            </div>
            <div className="flex justify-center items-center">
                <Timer/>
            </div>
            
        </div>
    )
} 