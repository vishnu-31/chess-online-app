import { useState } from 'react';
import './App.css';
import CustomChessBoard from "./CustomChessBoard"
import { NavBar } from './NavBar';
import { RightColumn } from "./RightColumn";
import { Chess } from 'chess.js';

function App() {
    const [chess] = useState(new Chess());
    const [fen, setFen] = useState<string>(chess.fen());
    const [over, setOver] = useState<boolean>(false);
    return (
        <div className="justify-center h-full w-full">
            <NavBar/>
            <main className="flex flex-col w-full md:h-full md:flex-row px-5 pt-1">
                {over?<div className='w-full h-16 bg-green-300 text-center font-semibold text-xl'>Match Over</div>:null}
                <CustomChessBoard chess={chess}  fen={fen} setFen={setFen} setOver={setOver}/>
                <RightColumn />
            </main>
        </div>
    )
}

export default App;
