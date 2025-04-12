import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full flex flex-col-reverse gap-5 md:flex-row  justify-between items-center px-4 md:px-10 lg:px-24 xl:px-[209px] py-5 bg-purple-50 shadow-lg border-t border-purple-200 gap-4 md:gap-0 text-center md:text-left'>
      <p className='text-gray-600 text-sm'>&copy; {new Date().getFullYear()} Dev.O. All rights reserved.</p>
      <nav>
        <ul className="flex flex-row md:flex-row gap-2 md:gap-4">
          <li>
            <NavLink className="px-3 py-1 text-sm font-medium hover:underline" to="/blogs">
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink className="px-3 py-1 text-sm font-medium hover:underline" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="px-3 py-1 text-sm font-medium hover:underline" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Footer
