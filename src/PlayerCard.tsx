import React from 'react';
import { RxAvatar } from "react-icons/rx";
import BlackKingIcon from "./assets/black-king.svg";
import WhiteKingIcon from "./assets/white-king.svg"; 
import { colorType } from './App';
interface PlayerCardProps {
  avatar: string;
  name: string;
  color: colorType ;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, color }) => {
  return (
    <div className=' m-1 p-2 bg-gray-600 w-[50%] rounded-xl'>
    <div className="flex md:flex-col m-2 items-center text-center">
            <RxAvatar className={"w-32 h-32"}/>
            <img src={color=="white"? WhiteKingIcon: BlackKingIcon} alt="King Icon" className=' pl-3 w-10 h-10' />
      <h3 style={{ color: "white" }}>{name}</h3>
      </div>
    </div>
  );
};

export default PlayerCard;