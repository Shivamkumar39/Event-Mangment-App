import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchAdminProfile } from '../store/FetchAdminSlice';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button
} from "@material-tailwind/react";
import { FaGithub, FaGlobe, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UpdatingAdminProfile from '../components/UpdateAdminProfile';


const ProfilePageAdmin = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }

  const dispatch = useDispatch();
  const { adminInfo, loading, error } = useSelector(state => state.admin);

  const fetchAdminData = async()=>{
    try {
      
      const response = await dispatch(FetchAdminProfile());
      if(!response.payload.success){
        toast.error(response.payload, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       // console.log(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchAdminData();
  },[])


  // const handleDelete = () => {
  //   if (filename) {
  //     dispatch(deleteImage(filename));
  //   } else {
  //     console.error('Filename is undefined');
  //   }
  // };

  // Handle loading state
  if (loading) {
    return (
      <div className="profile-page">
        <p>Loading...</p>
      </div>
    );
  }
   
  // Handle error state
  if (error) {
    return (
      <div className="profile-page">
        <p className="error">Error: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
      </div>
    );
  }

  // Handle case where adminInfo is null or undefined
  if (!adminInfo) {
    return (
      <div className="profile-page">
        <p className="error">User information not found.</p>
      </div>
    );
  }

  return (
    <>
     <ToastContainer/>
      <div className="flex justify-center items-center min-h-screen mr-20 ml-20 ">
        <div className="relative border-4 rounded-md text-black h-[30%]">
          <Button onClick={handleOpen} className="right-0 m-3 h-10 w-32 flex items-center">
            Edit Profile
            <PencilIcon className='h-3 w-3 ml-1' />
          </Button>
          <Card color="cyan" shadow={false} className="w-full text-black">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="flex items-center gap-4 pt-6 pb-4 px-6"
            >
              <Avatar
                size="lg"
                variant="circular"
                className='h-[20%] w-[15%] '
                src={`http://localhost:9999/uploads/${adminInfo.image}`}
                alt={adminInfo.username}
              />
              {/* <MdDelete  onClick={handleDelete} disabled={loadings}/>
            {loadings ? 'Deleting...' : 'Delete Image'}
            <div className="-ml-2.5 -mt-3">
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            {success && <p style={{ color: 'green' }}>Image deleted successfully!</p>}
            </div> */}
              
              <div className="flex flex-col gap-0.5 ml-10">
                <div className="flex items-center">
                  <label className="font-semibold">Username: </label>
                  <span className="ml-2">{adminInfo.username}</span>
                </div>
                <div className="flex items-center">
                  <label className="font-semibold">organizername: </label>
                  <span className="ml-2">{adminInfo.organizername}</span>
                </div>
                <div className="flex items-center">
                  <label className="font-semibold">Email: </label>
                  <span className="ml-2">{adminInfo.email}</span>
                </div>
                <Link to='/PostEvents'>
                  <Button className='items-center gap-2 rounded flex '>
                    <Cog6ToothIcon className='h-4 w-4' />
                    Post Events
                  </Button>
                </Link>
                <div className='flex items-center m-2 ml-2'>
                  <a href={adminInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='w-7 h-7 ml-2' />
                  </a>
                  <a href={adminInfo.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className='w-7 h-7 ml-2' />
                  </a>
                  <a href={adminInfo.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className='w-7 h-7 ml-2' />
                  </a>
                  <a href={adminInfo.website} target="_blank" rel="noopener noreferrer">
                    <FaGlobe className='w-7 h-7 ml-2' />
                  </a>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-6 pb-6">
              <Typography>
                "I found solution to all my design needs from Creative Tim. I use
                them as a freelancer in my hobby projects for fun! And it's really
                affordable, very humble guys !!!"
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>

       {open && <UpdatingAdminProfile open={open} onClose={handleOpen} />} 
    </>
  );
}

export default ProfilePageAdmin;
