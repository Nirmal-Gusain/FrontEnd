import React, { useState } from 'react'

const ChangePassword = () => {
    const [password,setPassword] = useState()
    const handlePassword = async(e)=>{
        e.preventDefault()
    }
  return (
    <form onSubmit={handlePassword}>
      <input type="text" onChange={(e)=>setPassword(e.target.value)} />
      <button>Update Password</button>
    </form>
  )
}

export default ChangePassword