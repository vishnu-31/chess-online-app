import { Square,validateFen } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import { colorType } from "./App";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setFen } from "./features/gameData/gameDataSlice";

interface ChessboardInterface {
  chess:any;
  setStatus:React.Dispatch<string>; 
  setIsYourTurn:React.Dispatch<boolean>; 
  socket:Socket; 
  color:colorType;}

const CustomChessBoard = ({chess,setStatus, setIsYourTurn, socket, color}:ChessboardInterface)=> {
  const fen = useAppSelector(state=>state.gameData.fen);
  const dispatch = useAppDispatch();
  useEffect (()=>{
    //socket functions declaration

    dispatch(setFen(chess.fen()))

    socket.on("move", (data:{from:Square, to:Square, turn:string}) =>{
      chess.move(data);
      dispatch(setFen(chess.fen()));
      if(data.turn == color[0]){
        setIsYourTurn(true);
      }
    })
  },[socket,chess])
  
  
  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    
    const moveData = chess.move({from:sourceSquare, to:targetSquare}); 
    console.log(moveData);

    
    if(validateFen(chess.fen()).ok && moveData.color == color.charAt(0)){
      dispatch(setFen(chess.fen()))
      socket.emit("move", {from:sourceSquare, to:targetSquare,turn:chess.turn()})
      setIsYourTurn(false);
      if(chess.isGameOver()){
        if(chess.isCheckmate()){
          setStatus("win")
          socket.emit("win");
        }
      }
      console.log("Move successful")
      return true;
    }
    else{
      chess.undo();
      console.log("Move failed");
      return false;
    }
  }


  return(
    <div className="w-full md:w-[50%]">
    <Chessboard 
      id="BasicBoard"
      position={fen}
      boardOrientation={color}
      allowDragOutsideBoard={false}
      onPieceDrop={onDrop}
      />
    </div>
  );
}

export default CustomChessBoard;
