import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    login(currentState === "Sign up" ? 'signup' : 'login',{fullName,email,password,bio})
  }
  
  return (
     
      <div className='min-h-screen bg-[#111b21] flex items-center justify-center gap-10 sm:justify-evenly max-sm:flex-col p-4'>
      
      <div className="flex flex-col items-center justify-center">
        <img src={assets.logo_big} className='w-[min(40vw,200px)] opacity-90' />
        <p className="text-[#8696a0] mt-4 text-lg font-light text-center">Chat Anytime, Anywhere</p>
      </div>
      
      
      <form onSubmit={onSubmitHandler} className='w-full max-w-md bg-[#202c33] border border-[#2f3b43] p-8 flex flex-col gap-5 rounded-sm shadow-xl'>
        
        <h2 className='text-[#e9edef] font-normal text-2xl flex justify-between items-center mb-2'>
          {currentState}
          
          {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} className='w-6 cursor-pointer invert opacity-70' />}
        </h2>

        {currentState === 'Sign up' && !isDataSubmitted && (
          <input 
            onChange={(event) => setFullName(event.target.value)} 
            value={fullName} 
            type='text' 
            className='p-3 bg-[#111b21] text-[#e9edef] border border-[#2f3b43] rounded-md focus:outline-none focus:border-blue-500 placeholder-[#8696a0]' 
            placeholder='Full Name' 
            required 
          />
        )}

        {!isDataSubmitted && (
          <>
          <input 
            onChange={(event) => setEmail(event.target.value)} 
            value={email} 
            type='email' 
            placeholder='Email Address' 
            required 
            className='p-3 bg-[#111b21] text-[#e9edef] border border-[#2f3b43] rounded-md focus:outline-none focus:border-blue-500 placeholder-[#8696a0]'
          />
          <input 
            onChange={(event) => setPassword(event.target.value)} 
            value={password} 
            type='password' 
            placeholder='Password' 
            required 
            className='p-3 bg-[#111b21] text-[#e9edef] border border-[#2f3b43] rounded-md focus:outline-none focus:border-blue-500 placeholder-[#8696a0]'
          />
          </>
        )}

        {isDataSubmitted && currentState === "Sign up" && (
          <textarea 
            onChange={(event) => setBio(event.target.value)} 
            value={bio} 
            rows={4} 
            className='p-3 bg-[#111b21] text-[#e9edef] border border-[#2f3b43] rounded-md focus:outline-none focus:border-blue-500 placeholder-[#8696a0]' 
            placeholder='Provide a short bio...' 
            required
          ></textarea>
        )}

        
        <button type='submit' className='py-3 mt-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium rounded-md cursor-pointer'>
          {currentState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-start gap-3 mt-2 text-sm text-[#8696a0]'>
          <input type='checkbox' required className="mt-1 accent-blue-500"/>
          <p>Agree to the terms of use and privacy policy.</p>
        </div>
        
        <div className='flex flex-col gap-2 mt-2'>
          {currentState === "Sign up" ? (
            <p className='text-sm text-[#8696a0]'>Already have an Account? <span onClick={() => { setCurrentState("Login"); setIsDataSubmitted(false) }} className='font-medium text-blue-500 cursor-pointer hover:underline'>Login here</span></p>
          ) : (
            <p className='text-sm text-[#8696a0]'>Create an Account <span onClick={() => setCurrentState("Sign up")} className='font-medium text-blue-500 cursor-pointer hover:underline'>Click here</span></p>
          )}
        </div>

      </form>
      
      </div>
  )
}

export default LoginPage