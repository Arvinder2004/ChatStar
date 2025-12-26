import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    if (messages) {
      setMsgImages(
        messages.filter(msg => msg.image).map(msg => msg.image)
      )
    }
  }, [messages])

  return selectedUser && (
    
    <div className={`bg-[#111b21] text-[#e9edef] h-full w-full relative overflow-y-scroll border-l border-[#2f3b43] ${selectedUser ? "max-md:hidden" : ""}`}>
      
      <div className='pt-14 flex flex-col items-center gap-3 text-sm font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} className='w-28 h-28 aspect-square rounded-full object-cover border border-[#2f3b43]' />
        
        <h1 className='text-xl font-medium flex items-center gap-2 mt-2'>
          {selectedUser.fullName}
         
          {onlineUsers.includes(selectedUser._id) && <span className='w-2.5 h-2.5 rounded-full bg-blue-500'></span>}
        </h1>
        
        
        <p className='text-[#8696a0] text-center px-6 leading-5'>
          {selectedUser.bio || "Hey there! I am using ChatApp."}
        </p>
      </div>

      
      <hr className='border-[#2f3b43] my-6 mx-5' />

      <div className='px-5'>
        <p className='text-[#8696a0] text-sm mb-3 font-medium'>Media</p>
        
        <div className='max-h-[300px] overflow-y-auto grid grid-cols-3 gap-2 custom-scrollbar'>
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded overflow-hidden aspect-square bg-[#202c33]'>
                <img src={url} className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'/>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#8696a0] col-span-3 text-center py-4 italic">No media shared yet</p>
          )}
        </div>
      </div>

     
      <div className='absolute bottom-8 left-0 right-0 flex justify-center'>
        <button 
          onClick={() => logout()} 
          className='bg-blue-500 hover:bg-blue-600 text-white border-none text-sm font-medium py-2.5 px-12 rounded-full cursor-pointer transition-colors shadow-lg'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default RightSidebar