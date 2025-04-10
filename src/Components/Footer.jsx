import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full flex justify-between items-center px-[209px] py-5 bg-purple-50 shadow-lg border-t border-purple-200'>
  <p className='text-gray-600 text-sm'>&copy; {new Date().getFullYear()} Dev.O. All rights reserved.</p>
  <nav>
            <ul className="flex gap-2">
              <li>
                <NavLink className="px-5 py-3 text-sm font-medium" to="/blogs">
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink className="px-5 py-3 text-sm font-medium" to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="px-5 py-3 text-sm font-medium"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
</div>

  )
}

export default Footer