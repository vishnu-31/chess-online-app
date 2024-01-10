import { Square,validateFen } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";
import { colorType } from "./App";
import { Socket } from "socket.io-client";

const CustomChessBoard = ({chess,setOver, socket, color}:{chess:any, setOver:React.Dispatch<boolean>, socket:Socket, color:colorType})=> {
  const [fen, setFen] = useState<string>(chess.fen());
  
  useEffect (()=>{
    //socket functions declaration

    socket.on("move", (data:{from:Square, to:Square}) =>{
      chess.move(data);
      setFen(chess.fen());
    })
  },[socket,chess])
  
  
  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    
    const moveData = chess.move({from:sourceSquare, to:targetSquare}); 
    console.log(moveData);

    
    if(validateFen(chess.fen()).ok){
      setFen(chess.fen())
      socket.emit("move", {from:sourceSquare, to:targetSquare})
      setOver(chess.isGameOver())
      console.log("Move successful")
      return true;
    }
    else{
      chess.undo();
      setFen(chess.fen());
      return false;
    }
  }


  return(
    <div className="w-full md:w-[50%] ">
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
