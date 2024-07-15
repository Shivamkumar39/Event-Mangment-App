import React, { useEffect, useState } from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminLogin from '../AdminComponets/AdminLogin';

// User menu list component
const UserMenuList = ({ closeMenu, handleLogout }) => (
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
      onClick={handleLogout} // This references the handleLogout function
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
);

// Admin menu list component
const AdminMenuList = ({ closeMenu, handleLogout }) => (
  <MenuList className="p-1">

    <Link to='/adminprofile'>
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

    <Link to='/PostEvents'>
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
          Post Events
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
          All Events
        </Typography>
      </MenuItem>
    </Link>

    <MenuItem
      onClick={handleLogout} // This references the handleLogout function
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
    {/* <MenuItem
      onClick={handleAdminAction}
      className='items-center gap-2 rounded flex'
    >
      <Cog6ToothIcon className='h-4 w-4' />
      <Typography
        as="span"
        variant="small"
        className="font-normal ml-3"
        color='inherit'
      >
        Admin Actions
      </Typography>
    </MenuItem> */}
  </MenuList>
);

const NavList = () => (
  <ul className="mb-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center mt-2">
    <Link to=''><p className="font-medium text-blue-gray-800 hover:underline hover:text-black">Collages Event</p></Link>
    <Link to=''><p className="font-medium text-blue-gray-800 hover:underline hover:text-black">Company Event</p></Link>
    <Link to=''><p className="font-medium text-blue-gray-800 hover:underline hover:text-black">Latest Event</p></Link>
  </ul>
);

const Navbars = () => {
  const { userInfo } = useSelector(state => state.user);
  const {adminInfo} = useSelector(state => state.admin);
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen(prev => !prev);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );

    if (localStorage.getItem("authToken")) {
      setToken(true);
    }
  }, [localStorage.getItem("authToken")]);

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("adminInfo");
    localStorage.removeItem('adminId');
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleOpenAdminLogin = () => {
    setShowAdminLogin(true);
  };

  // Debugging: Log userInfo and adminInfo
  console.log('userInfo:', userInfo);
  console.log('adminInfo:', adminInfo);

  return (
    <>
      <Navbar className={`mx-auto fixed z-50 left-0 right-0 max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-5 shadow-xl ${location.pathname === "/login" || location.pathname === '/register' ? "hidden" : ""}`}>
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <div className='flex'>
            <Link to='/'>
              <label className="mr-4 ml-2 cursor-pointer font-extrabold flex text-xl ">
                Event Platform
              </label>
            </Link>
            <div className="hidden lg:block">
              <NavList />
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

            {token ? (
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
                      alt="Profile Image"
                      className="border border-gray-900 p-0.5"
                      src={`http://localhost:9999/uploads/${userInfo?.image || adminInfo?.image}`}
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                </MenuHandler>

                {userInfo ? (
                  <UserMenuList closeMenu={closeMenu} handleLogout={handleLogout} />
                ) : (
                  <AdminMenuList closeMenu={closeMenu} handleLogout={handleLogout} />
                )}
              </Menu>
            ) : (
              <>
                <Link to='/login'>
                  <Button size="sm" variant="text">
                    <span>User Login</span>
                  </Button>
                </Link>
                <Button size="sm" variant="text" onClick={handleOpenAdminLogin}>
                  <span>Admin/Organizer</span>
                </Button>
              </>
            )}
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </Navbar>

      {showAdminLogin && <AdminLogin open={showAdminLogin} setOpen={setShowAdminLogin} />}
    </>
  );
};

export default Navbars;
