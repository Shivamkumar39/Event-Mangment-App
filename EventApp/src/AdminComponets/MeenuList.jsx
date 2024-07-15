import React, { useEffect, useState } from 'react'

import {

  Typography,

  MenuList,
  MenuItem,

} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
 
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';


const MeenuList = () => {
  return (
   <>
          <MenuList className="p-1">
                  <Link to='/userprofile'>
                    <MenuItem
                      onClick={closeMenu}
                      className='items-center gap-2 rounded flex'
                    >
                      <UserCircleIcon className='h-4 w-4' />
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal ml-3"
                        color='inherit'
                      >
                        My Profile
                      </Typography>
                    </MenuItem>
                  </Link>

                  <Link to='/UserBookedEvent'>
                    <MenuItem
                      onClick={closeMenu}
                      className='items-center gap-2 rounded flex'
                    >
                      <Cog6ToothIcon className='h-4 w-4' />
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal ml-3"
                        color='inherit'
                      >
                        Booked Events
                      </Typography>
                    </MenuItem>
                  </Link>   

                  <MenuItem
                    onClick={handleLogout}
                    className='items-center gap-2 rounded flex hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  >
                    <PowerIcon className='h-4 w-4 text-red-500' />
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal ml-3"
                      color='red'
                    >
                      Sign Out
                    </Typography>
                  </MenuItem>
                </MenuList>  
   </>
  )
}

export default MeenuList