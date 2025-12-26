import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const render = new FileReader();
    render.readAsDataURL(selectedImage);
    render.onload = async () => {
      const base64Image = render.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate('/');
    };
  };

  return (
   
    <div className="min-h-screen bg-[#111b21] flex items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-[#202c33] border border-[#2f3b43] rounded-sm shadow-xl p-8">
          
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between border-b border-[#2f3b43] pb-4">
            <h3 className="text-xl text-[#e9edef] font-medium">Profile</h3>
            <p onClick={() => navigate('/')} className="text-[#8696a0] cursor-pointer hover:text-blue-500 transition-colors text-sm font-medium">
              Cancel
            </p>
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="avatar" className="relative cursor-pointer group">
              <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
              
              <img 
                src={selectedImage ? URL.createObjectURL(selectedImage) : authUser.profilePic || assets.avatar_icon} 
                className="w-20 h-20 rounded-full object-cover border-2 border-[#2f3b43] group-hover:border-blue-500 transition-colors" 
                alt="Profile"
              />
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <img src={assets.gallery_icon} className="w-6 invert opacity-90" alt="Upload" />
              </div>
            </label>
            
            <div className="flex flex-col">
              <span className="text-[#e9edef] font-medium">Profile Photo</span>
              <label htmlFor="avatar" className="text-blue-500 text-sm cursor-pointer hover:underline">
                Change Photo
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#8696a0] text-sm font-medium">Your Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              type="text" 
              required 
              placeholder="Your Name" 
              className="p-3 bg-[#111b21] text-[#e9edef] border border-[#2f3b43] rounded-md focus:outline-none focus:border-blue-500 placeholder-[#8696a0] transition-colors" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#8696a0] text-sm font-medium">Bio</label>
            <textarea 
              onChange={(e) => setBio(e.target.value)} 
              value={bio} 
              placeholder="Write a few words about yourself..." 
              className="p-3 bg-[#111b21] text-[#e9edef] border border-[#2f3b43] rounded-md focus:outline-none focus:border-blue-500 placeholder-[#8696a0] transition-colors resize-none" 
              rows={3}
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors text-white py-3 px-6 rounded-md text-sm font-medium cursor-pointer shadow-md mt-2" >
            Save Changes
          </button>
        </form>

      </div>
    </div>
  );
};

export default ProfilePage;