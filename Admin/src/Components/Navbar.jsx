// src/components/Navbar.js
import React, { useState } from 'react';
import { UserIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon, ArrowDownCircleIcon } from '@heroicons/react/24/solid';
import { Menu, MenuHandler, MenuList, MenuItem, MenuContainer, Typography } from "@material-tailwind/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full h-[10%] flex items-center justify-between p-4 bg-gray-50 text-black fixed top-0 rounded-lg shadow-md z-20">
            <div className='justify-between flex w-[20%]'>
                <h1 className="text-2xl font-bold">Navbar</h1>
                <button
                    className="block"
                    onClick={isOpen}
                >
                   <ArrowDownCircleIcon className='h-8 w-8'/>
                </button>
                
            </div>

            <div>
                <Menu open={isOpen} handler={setIsOpen} placement="bottom-end">
                    <MenuHandler>
                        <button onClick={handleMenuToggle} className="flex justify-center items-center rounded-full h-10 w-10 border-2 border-black">
                            <UserIcon className="h-5 w-5 mr-2 cursor-pointer " />
                        </button>
                    </MenuHandler>
                    <MenuList className="p-1">
                        <MenuItem className='items-center gap-2 rounded flex'>
                            <UserCircleIcon className='h-4 w-4' />
                            <Typography as="span" variant="small" className="font-normal ml-3" color='inherit'>
                                My Profile
                            </Typography>
                        </MenuItem>

                        <MenuItem className='items-center gap-2 rounded flex'>
                            <Cog6ToothIcon className='h-4 w-4' />
                            <Typography as="span" variant="small" className="font-normal ml-3" color='inherit'>
                                Edit Profile
                            </Typography>
                        </MenuItem>

                        <MenuItem className='items-center gap-2 rounded flex hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'>
                            <PowerIcon className='h-4 w-4 text-red-500' />
                            <Typography as="span" variant="small" className="font-normal ml-3" color='red'>
                                Sign Out
                            </Typography>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>

    );
};

export default Navbar;
