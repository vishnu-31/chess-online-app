import './App.css';
import { Home } from './Home';
import CustomChessBoard from "./CustomChessBoard"
import { NavBar } from './NavBar';
import { RightColumn } from "./RightColumn";
import { useAppDispatch, useAppSelector } from './hooks';
import { setColor, setOpponentName, setPlayerName, setRoom, setStatus } from './features/userData/userDataSlice';
import { abort, setDataLoaded, setIsRoomFull, setToChoose, setYourturn } from './features/flagData/flagDataSlice';

export type colorType = "white" | "black";

function App() {
    const chess = useAppSelector(state => state.userData.chess)
    const status = useAppSelector(state => state.userData.status)
    const isAborted = useAppSelector(state => state.flagData.isAborted)
    const isYourturn = useAppSelector(state => state.flagData.isYourturn)
    const playerName = useAppSelector(state => state.userData.playerName)
    const opponentName = useAppSelector(state => state.userData.opponentName)
    const dataLoaded = useAppSelector(state => state.flagData.dataLoaded)
    const color = useAppSelector(state => state.userData.color)
    const toChoose = useAppSelector(state => state.flagData.toChoose)
    const  isRoomFull = useAppSelector(state => state.flagData.isRoomFull)
    const room = useAppSelector(state => state.userData.room)
    const socket = useAppSelector(state => state.userData.socket)
    

    const dispatch = useAppDispatch();

    const chooseColor =(color:colorType) =>{
        dispatch(setColor(color));
        if (color =="white"){
            dispatch(setYourturn(true));
        }
        dispatch(setToChoose(false));
        dispatch(setDataLoaded());
        socket.emit("putColor", {playerName:playerName, color:color})
    }

    socket.on("win", ()=>{
        dispatch(setStatus("lose"));
    })

    socket.on("abort", ()=>{
        dispatch(abort());
    })

    socket.on("roomFull", ()=>{
        dispatch(setIsRoomFull());
        console.log("roomfull");
    });

    socket.on("setColor", (color)=>{
        console.log("setColor", color);
        dispatch(setColor(color));
        if (color == "white"){
            dispatch(setYourturn(true));
        }
        dispatch(setDataLoaded());
    });

    socket.on("chooseColor", ()=>{
        console.log("chooseColor");
        dispatch(setToChoose(true));

    });

    socket.on("opponentName", (opponentName) =>{
        dispatch(setOpponentName(opponentName));
        console.log("opponentName", opponentName);
    });

return (
    <div className="justify-center h-full w-full">
        <NavBar/> 
        {isAborted?

        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className='text-center text-xl font-semibold'>{opponentName} has quit the Game....</div>
            <button className='bg-black text-white text-xl rounded-lg border-white border-3 py-1 px-3'>Close the Game</button>
        </div>

        : !dataLoaded?

            isRoomFull?
            <div 
                className=' flex w-full h-full bg-gray-500 text-red-600 font-bold text-3xl text-center items-center'
                >Room is full</div>
            :

            <Home 
                playerName={playerName}
                setPlayerName={(name)=> dispatch(setPlayerName(name))} 
                room={room} 
                socket={socket}
                setRoom={(room)=> dispatch(setRoom(room))} 
                toChoose={toChoose}
                chooseColor={chooseColor}/> 
        :
            <div className="flex w-full min-h-screen">
            {status=="lose"?
            <div className='w-full h-16 bg-green-300 text-center font-semibold text-xl'>Oh nooo... You have been Destroyed by {opponentName}</div>:
            status=="win"?
            <div className='w-full h-16 bg-green-300 text-center font-semibold text-xl'>WIN!!!!. You have Destroyed {opponentName}'s Kingdom!</div>:null
            }

                <main className="flex flex-col w-full md:h-full md:flex-row px-5 pt-1">
                    <CustomChessBoard chess={chess} color={color}  socket={socket} setIsYourTurn={(val)=>dispatch(setYourturn(val))} setStatus={(status)=> dispatch(setStatus(status))}/>
                    <RightColumn playerName={playerName} room={room} isYourTurn={isYourturn} opponentName={opponentName} color={color} />
                </main>
            </div>
        }
    </div>
    )
}

export default App;
