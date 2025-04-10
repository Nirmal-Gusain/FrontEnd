import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full flex justify-between items-center px-[209px] py-5 bg-purple-50 shadow-lg '>
        <div className='flex gap-5'>
            <p>© 2020 unFiltered</p>
            <Link className='text-sm font-medium'>Terms</Link>
            <Link className='text-sm font-medium'>Privacy</Link>
            <Link className='text-sm font-medium'>Cookies</Link>
        </div>
        <div className='flex gap-5'>
            <Link className='text-sm font-medium'>Travel</Link>
            <Link className='text-sm font-medium'>Business</Link>
            <Link className='text-sm font-medium'>Health</Link>
            <Link className='text-sm font-medium'>Finance</Link>
            <Link className='text-sm font-medium'>Technology</Link>
        </div>
    </div>
  )
}

export default Footer