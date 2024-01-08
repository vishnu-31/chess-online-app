



export const NavBar = () =>{
    return (
        <nav className="flex items-center rounded-lg justify-between bg-slate-600 h-12 ">
            <h1 className="uppercase tracking-wider text-white">Chess APP</h1>
            <div className="flex justify-between w-[30%] px-3 uppercase text-yellow-400">
                <div>Restart game</div>
                <div>Share game</div>
            </div>
        </nav>
    );
}