'use client'
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { FaCartPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [user, setUser] = useState(null);
    const handleNav = () => {
        setNav(!nav);
    };
    const [cart, setCart] = useState(false);
    const handleCart = () => {
        setCart(!cart);
    }

    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Home', link: '/' },
        { id: 2, text: 'Products', link: '/products' },
        { id: 3, text: 'Contacts', link: '/contact' },
        { id: 5, text: 'Profile', link: '/profile' },
        { id: 4, text: 'Logout', link: '/logout' },
        { id: 6, text: 'Cart', link: '/cart' },
    ];


    return (
        <nav className='bg-indigo-600'>
            <div className="container flex justify-between items-center  text-white min-h-[60px]">
                <h1 className='w-full text-3xl font-bold text-white'>Store</h1>
                <ul className='hidden md:flex space-x-4'>
                    {navItems.map(item => (
                        <li
                            key={item.id}
                            className='p-1 hover:bg-white rounded-xl cursor-pointer duration-300 hover:text-indigo-600'
                        >
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </ul>

                <div onClick={handleNav} className='block md:hidden'>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>

                <ul
                    className={
                        nav
                            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-indigo-600 ease-in-out duration-500 z-50'
                            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-50'
                    }
                >
                    <h1 className='w-full text-3xl font-bold  m-4'>Store</h1>
                    {navItems.map(item => (
                        <li
                            key={item.id}
                            className='p-4 text-lg border-b rounded-xl hover:bg-white duration-300 hover:text-indigo-600 cursor-pointer border-gray-600'
                        >
                            <Link className='block w-full h-full' href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </ul>


            </div>
        </nav>
    );
};

export default Navbar;