import React from 'react'
import {Link} from "react-router-dom"



const MailverificationSuccess = () => {
  return (
    <div className='text-center h-[90vh] bg-[#99E2B4] w-full flex items-center justify-center flex-col gap-10'>
        <h1 className='text-5xl font-medium'>Your mail is verified Successfully.</h1>
        <Link to="/login" className='bg-blue-500 px-15 py-2 font-medium rounded-full text-2xl text-white'>LOGIN</Link>
    </div>
  )
}

export default MailverificationSuccess