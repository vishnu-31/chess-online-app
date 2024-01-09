



export const NavBar = () =>{
    return (
        <nav className="flex items-center  justify-between bg-gray-400 h-12 ">
            <h1 className="uppercase tracking-wider text-white">Chess APP</h1>
            <div className="flex justify-between w-[30%] px-3 uppercase text-gray-400">
                <div>Restart game</div>
                <div>Share game</div>
            </div>
        </nav>
    );
}