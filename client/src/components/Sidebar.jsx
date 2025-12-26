import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(""); 

  const filteredUsers = input
    ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase()))
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const navigate = useNavigate();

  return (
    <div className="bg-[#111b21] h-full flex flex-col">
      
      <div className="bg-[#202c33] p-4 flex justify-between items-center px-4 py-3 border-r border-[#2f3b43]">
         
        <img src={assets.logo} alt="logo" className="max-w-[120px] opacity-80" /> 
        
        <div className="relative group">
          <img src={assets.menu_icon} alt="menu" className="w-6 opacity-70 cursor-pointer" />
          
          <div className="absolute top-full right-0 z-50 w-40 py-2 rounded-sm bg-[#233138] shadow-lg text-gray-200 hidden group-hover:block border border-[#2f3b43]">
            <p onClick={() => navigate("/profile")} className="cursor-pointer px-4 py-2 hover:bg-[#182229] text-sm">
              Profile
            </p>
            <p onClick={() => logout()} className="cursor-pointer px-4 py-2 hover:bg-[#182229] text-sm">
              Logout
            </p>
          </div>
        </div>
      </div>

    
      <div className="p-2 border-b border-[#2f3b43]">
        <div className="bg-[#202c33] rounded-lg flex items-center gap-2 px-4 py-1.5">
          <img src={assets.search_icon} alt="Search" className="w-4 opacity-50" />
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-[#e9edef] text-sm placeholder-[#8696a0] flex-1 py-1"
            placeholder="Search or start new chat"
          />
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={index}
            className={`relative flex items-center gap-3 p-3 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-[#2f3b43]/30 ${
              selectedUser?._id === user._id ? "bg-[#2a3942]" : ""
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-center">
                <p className="text-[#e9edef] text-md font-normal truncate">{user.fullName}</p>
               
                {onlineUsers.includes(user._id) && (
                   <span className="text-[#00a884] text-[10px] font-medium">ONLINE</span>
                )}
              </div>
              <p className="text-[#8696a0] text-sm truncate">Click to open chat info</p>
            </div>

            {unseenMessages[user._id] > 0 && (
              <div className="min-w-[20px] h-5 flex justify-center items-center rounded-full bg-[#00a884] text-[#111b21] text-xs font-bold px-1">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;