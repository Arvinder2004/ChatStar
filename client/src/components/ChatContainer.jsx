import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const scrollEnd = useRef();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const blueFilter = "invert(38%) sepia(93%) saturate(1638%) hue-rotate(202deg) brightness(101%) contrast(96%)";

  return selectedUser ? (
    <div className="flex flex-col h-full w-full bg-[#0b141a]">
      
      
      <div className="h-[60px] bg-[#202c33] px-4 flex items-center justify-between border-l border-[#2f3b43]">
        <div className="flex items-center gap-4 cursor-pointer">
         
          <img 
            onClick={() => setSelectedUser(null)} 
            src={assets.arrow_icon} 
            alt="back" 
            className="md:hidden w-6" 
            style={{ filter: blueFilter }} 
          />
          <img src={selectedUser.profilePic || assets.avatar_icon} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex flex-col">
            <p className="text-[#e9edef] font-medium">{selectedUser.fullName}</p>
            {onlineUsers.includes(selectedUser._id) ? (
                 <span className="text-blue-500 text-xs">online</span>
            ) : (
                <span className="text-[#8696a0] text-xs">offline</span>
            )}
          </div>
        </div>
        <img src={assets.help_icon} className="w-6 opacity-60 cursor-pointer" alt="Help" />
      </div>

    
      <div className="flex-1 overflow-y-auto p-4 md:px-10 custom-scrollbar bg-[#0b141a]"> 
        <div className="flex flex-col gap-1">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === authUser._id;
          return (
            <div
              key={index}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
            >
              
              <div className={`max-w-[65%] md:max-w-[50%] p-2 rounded-lg mb-1 relative shadow-sm bg-[#202c33] ${
                  isMe ? "rounded-tr-none" : "rounded-tl-none"
              }`}>
                
                {msg.image && (
                  <img src={msg.image} className="w-full rounded-md mb-2 border border-white/10" />
                )}
                
                {msg.text && (
                    <p className="text-[#e9edef] text-[14.2px] leading-5 px-1">{msg.text}</p>
                )}

                <div className={`text-[10px] text-right mt-1 text-[#8696a0] opacity-70`}>
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
        </div>
      </div>

      
      <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
        <input onChange={handleSendImage} type="file" id="image" accept="image/png,image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} className="w-6 cursor-pointer opacity-60 hover:opacity-100 hover:text-blue-500 transition-all invert" />
        </label>

        <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 py-2">
            <input 
                onChange={(e) => setInput(e.target.value)} 
                value={input} 
                onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 bg-transparent border-none outline-none text-[#d1d7db] placeholder-[#8696a0] text-[15px]"
            />
        </div>

        <div onClick={handleSendMessage} className="cursor-pointer p-2 rounded-full hover:bg-blue-500/10 transition-colors">
            
            <img src={assets.send_button} className="w-6 opacity-80" />
        </div>
      </div>
    </div>
  ) : (
    
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#222e35] border-b-[6px] border-blue-500">
      <div className="text-center">
        <img src={assets.logo_icon} className="w-20 opacity-40 mx-auto mb-5" />
        <h1 className="text-[#e9edef] text-3xl font-light mb-4">Chat Anytime, Anywhere</h1>
        <p className="text-[#8696a0] text-sm">
          Send and receive messages without keeping your phone online.<br/>
          Use this Chat App on up to 4 linked devices and 1 phone.
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;