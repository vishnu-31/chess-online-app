import React from 'react';
import BlackKingIcon from "./assets/black-player-icon.png";
import WhiteKingIcon from "./assets/white-player-icon.png"; 
import { colorType } from './App';
interface PlayerCardProps {
  name: string;
  color: colorType ;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, color }) => {
  return (
    <div className=' m-1 p-2 bg-gray-600 w-[50%] rounded-xl'>
      <div className="flex flex-col md:flex-row md:flex-wrap m-2 items-center justify-center text-center">            
        <img src={color=="white"? WhiteKingIcon: BlackKingIcon} alt="King Icon" className={` w-32 h-32 rounded-xl bg-white`} />
        <h3 className='text-white justify-center mx-5 w-8'>{name}</h3>
      </div>
    </div>
  );
};

export default PlayerCard;