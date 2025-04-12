import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { EmailContext } from './emailContext/Emailstore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Otpverify = () => {
    const [otp,setOtp] = useState()
    const {email} = useContext(EmailContext)
    console.log(email)
    const navigate = useNavigate()
    const handleOtp = async(e)=>{
        e.preventDefault()

        try {
            const response = await axios.post("https://server-m4z2.onrender.com/api/verify-otp",{email,otp})
            if(response.status === 200){
                toast.success("OTP verified successfully")
                navigate("/password-change")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <form onSubmit={handleOtp}>
      <input type="text" onChange={(e)=>setOtp(e.target.value)} />
      <button>Submit OTP</button>
    </form>
  )
}

export default Otpverify