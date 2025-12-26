import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (

    <div className="w-full h-screen bg-[#111b21] overflow-hidden">
      <div className="w-full h-full flex">
        
        <div className={`w-full md:w-[350px] lg:w-[400px] border-r border-[#2f3b43] h-full ${selectedUser ? "hidden md:block" : "block"}`}>
          <Sidebar />
        </div>

    
        <div className={`flex-1 h-full bg-[#0b141a] relative ${!selectedUser ? "hidden md:flex" : "flex"}`}>
            <ChatContainer />
        </div>

        {selectedUser && (
          <div className="hidden xl:block w-[350px] border-l border-[#2f3b43] h-full bg-[#111b21]">
             <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;