import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/fetchUserSlice';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, useLocation,useNavigate} from 'react-router-dom';




// nav list component

const NavList = () => {
  return (
    <ul className="mb-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center mt-2 ">
      <Link to=''> <p className="font-medium text-blue-gray-800 hover:underline hover:text-black ">Collages Event</p></Link>
      <Link to=''> <p className="font-medium text-blue-gray-800 hover:underline hover:text-black ">Company Event</p></Link>
      <Link to=''> <p className="font-medium text-blue-gray-800 hover:underline hover:text-black ">Latest Event</p></Link>

    </ul>
  );
}


const Navbars = () => {
  const { userInfo} = useSelector(state => state.user);

  const [token, setToken] = useState(false)
  const navigate = useNavigate();
  
  // console.log(authToken);
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handelLogout = ()=>{
    console.log("logout");
    localStorage.removeItem("authToken")
    localStorage.removeItem("userInfo")
    navigate('/login')
  }
  const closeMenu = () => setIsMenuOpen(false);


 
  

 useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );

    if(localStorage.getItem("authToken")){
      setToken(true)
    }
    
    
  }, [localStorage.getItem("authToken")]);

  const location = useLocation()

  return (
    <>
      <Navbar className={`mx-auto fixed z-50 left-0 right-0   max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-5  shadow-xl ${location.pathname === "/login" || location.pathname === '/register' ? "hidden" : ""}`}>
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900 ">
          <div className='flex'>
            <label className="mr-4 ml-2 cursor-pointer font-medium flex">
              Event Platform
            </label>
            <div className="hidden lg:block ">
              <ul className="mb-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center mt-2">
                <Link to=''><p className="font-medium text-blue-gray-800 hover:underline hover:text-black">Collages Event</p></Link>
                <Link to=''><p className="font-medium text-blue-gray-800 hover:underline hover:text-black">Company Event</p></Link>
                <Link to=''><p className="font-medium text-blue-gray-800 hover:underline hover:text-black">Latest Event</p></Link>
              </ul>
            </div>
          </div>

          <div className='relative flex text-blue-gray-900'>
            <IconButton
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden"
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>

            {token? (
              <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src={`http://localhost:9999/uploads/${userInfo.image}`}
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                      }`}
                  />
                </Button>
              </MenuHandler>

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
                  onClick={handelLogout}
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

            </Menu>
            ) : (
              <>
                <Link to='/login'>
                  <Button size="sm" variant="text">
                    <span>Log In</span>
                  </Button>
                </Link>
                <Button size="sm" variant="text">
                  <Link to='/login'><span>Register Now</span></Link>
                </Button>
              </>
            )}
          </div>


        </div>
        {/* Replace Collapse with your actual Collapse component */}
        <Collapse open={isNavOpen} className="overflow-scroll">
          {/* Replace NavList with your actual NavList component */}
          <NavList />
        </Collapse>
      </Navbar>


    </>
  )
}

export default Navbars