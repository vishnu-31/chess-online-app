import { Square,validateFen } from "chess.js";
import { Chessboard } from "react-chessboard";

const CustomChessBoard = ({chess,fen, setFen, setOver})=> {

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    
    const moveData = chess.move({from:sourceSquare, to:targetSquare}); 
    console.log(moveData);
    
    if(validateFen(chess.fen()).ok){
      setFen(chess.fen())
      console.log("Move successful")
      return true;
    }
    else{
      chess.undo();
      setFen(chess.fen());
      return false
    }
  }


  return(
    <div className="w-full md:w-[50%] ">
    <Chessboard 
      id="BasicBoard"
      position={fen}
      allowDragOutsideBoard={false}
      onPieceDrop={onDrop}
      />
    </div>
  );
}

export default CustomChessBoard;
