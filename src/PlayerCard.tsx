import React from 'react';
import { RxAvatar } from "react-icons/rx";
import BlackKingIcon from "./assets/black-king.svg";
import WhiteKingIcon from "./assets/white-king.svg"; 

interface PlayerCardProps {
  avatar: string;
  name: string;
  color: "white" | "black" ;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ avatar, name, color }) => {
  return (
    <div className='p-3 bg-gray-600  rounded-xl'>
    <div className="flex flex-col m-3 items-center text-center">
            <RxAvatar className={"w-32 h-32"}/>
            <img src={color=="white"? WhiteKingIcon: BlackKingIcon} alt="King Icon" className=' pl-3 w-10 h-10' />
      <h3 style={{ color: "white" }}>{name}</h3>
      </div>
    </div>
  );
};

export default PlayerCard;