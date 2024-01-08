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
    <div className='p-3 bg-stone-600 w-60 rounded-xl'>
    <div className="flex flex-col m-3">
        <div className="flex items-center">
            <RxAvatar className={"w-16 h-16 pr-5"}/>
            <img src={color=="white"? WhiteKingIcon: BlackKingIcon} alt="King Icon" className='w-10 h-10' />
        </div>
      <h3 style={{ color: "white" }}>{name}</h3>
      </div>
    </div>
  );
};

export default PlayerCard;