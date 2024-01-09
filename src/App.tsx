import './App.css';
import CustomChessBoard from "./CustomChessBoard"
import { NavBar } from './NavBar';
import { RightColumn } from "./RightColumn";

function App() {

    return (
        <div className="justify-center h-full w-full">
            <NavBar/>
            <main className="flex w-full h-full flex-row px-5 pt-1">
                <CustomChessBoard />
                <RightColumn />
            </main>
        </div>
    )
}

export default App;
