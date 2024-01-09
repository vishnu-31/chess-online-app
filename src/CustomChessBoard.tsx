import { Chessboard } from "react-chessboard";
const CustomChessBoard = () => {
  
  return(
    <div className="w-[50%] ">
    <Chessboard 
      id="BasicBoard"
      allowDragOutsideBoard={false}
      />
    </div>
  );
}

export default CustomChessBoard;
