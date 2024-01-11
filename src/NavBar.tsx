import AppIcon from "./assets/app-logo.png";

export const NavBar = () =>{
    return (
        <nav className="flex items-center  justify-center bg-gray-400 h-12 py-2 rounded-lg ">
            <div className="flex justify-center items-center">
                <img src={AppIcon} alt="chess Logo" className="w-12 h-12"/>       
                <h1 className="font-bold mx-4 my-2 text-xl md:text-3xl">Go Chess!!!</h1>
            </div>
        </nav>
    );
}