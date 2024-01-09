import { useState } from "react";


export const Chat = () =>{
    const [ messages, setMessages] = useState([
        {user:"Me", message:"Hi this is my first Match Here"},
        {user:"Opponent", message:"Cool Lets play this match with all we have got.."},
    ]);
    return (
        <div className="w-full rounded-lg bg-gray-500 p-2 border-3">
            <div className="uppercase m-1 font-bold">CHAT</div>
            <div className="flex flex-col">
                <div className="flex flex-col max-h-56 overflow-scroll scroll-m-0">
                {
                    messages.map((item,idx) =>(
                        <div key={idx} className="flex  p-2 rounded-lg bg-gray-400 m-1">
                            <span className="font-bold">{item.user}&nbsp;:</span>
                            <span className="px-3">{item.message}</span>
                        </div>
                    ))
                }
                </div>
                <div className="flex bg-slate-100 m-1 rounded-lg items-center">
                    <input className="w-full h-full m-1 py-2 rounded-lg" type="text" name="chat" id="chat" />
                    <button 
                        onClick={()=>setMessages([...messages, {user:"Me", message:"Message Sent"}])} 
                        className="p-2 rounded-lg mx-1 bg-gray-300"
                        >Send</button>
                </div>
            </div>
        </div>
    );
} 