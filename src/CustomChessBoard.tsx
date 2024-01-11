import { Square,validateFen } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";
import { colorType } from "./App";
import { Socket } from "socket.io-client";

const CustomChessBoard = ({chess,setStatus, socket, color}:{chess:any, setStatus:React.Dispatch<string>, socket:Socket, color:colorType})=> {
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

    
    if(validateFen(chess.fen()).ok && moveData.color == color.charAt(0)){
      setFen(chess.fen())
      socket.emit("move", {from:sourceSquare, to:targetSquare})
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
