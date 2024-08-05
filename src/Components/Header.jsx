import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Cart from './Cart'

export default function Header() {
    const Links = [
        {
            id: 0,
            href: "/Public-Api/",
            title: "Product"
        },
        {
            id: 1,
            href: "/Public-Api/book",
            title: "Book"
        }
    ]
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='text-2xl font-semibold text-purple-500'><Link to="/Public-Api/"><img src="/assest/android-chrome-192x192.png" alt="Logo" className='w-9 mx-2' /></Link></div>
            <nav>
                <ul className='flex items-center gap-4'>
                    {Links.map((link) => (
                        <li key={link.id} className='text-xl font-semibold px-2 py-1 rounded-full hover:bg-white hover:text-red-500 transition-colors duration-200'>
                            <NavLink to={link.href} className={({ isActive }) => (isActive ? "text-red-500" : "")}>{link.title}</NavLink>
                        </li>

                    ))}
                </ul>
            </nav>
            <div>
                <Cart />
            </div>
        </div>
    )
}
