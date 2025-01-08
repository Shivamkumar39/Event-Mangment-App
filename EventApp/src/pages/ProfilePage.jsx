import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/fetchUserSlice';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { PencilIcon } from '@heroicons/react/24/solid';
import UpdateProfileDialog from '../components/UpdateProfile';

const ProfilePage = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { userInfo, loading, error } = useSelector(state => state.user);
    console.log(userInfo.image);
    
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            dispatch(fetchUserProfile());
          }
        
    }, [dispatch]);

    const handleOpen = () => {
        setOpen(!open);
    };

    if (loading) {
        return (
            <div className="profile-page">
                <p>Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
          <div className="profile-page">
            <p className="error">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</p>
          </div>
        );
      }

    if (!userInfo) {
        return (
            <div className="profile-page">
                <p className="error">User information not found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="relative border-4 rounded-md text-black w-[90%] max-w-[600px]">
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
                                className='h-[20%] w-[15%]'
                                src={`http://localhost:9999/uploads/${userInfo.image || 'default-avatar.png'}`}
                                alt={userInfo.username}
                            />
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center">
                                    <label className="font-semibold">Username: </label>
                                    <span className="ml-2">{userInfo.username}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold">Email: </label>
                                    <span className="ml-2">{userInfo.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold">Mobile: </label>
                                    <span className="ml-2">{userInfo.mobile}</span>
                                </div>
                                <Typography color="blue-gray" className="mt-2">
                                    Frontend Lead @ Google
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="px-6 pb-6">
                            <Typography>
                                "I found solutions to all my design needs from Creative Tim. I use
                                them as a freelancer in my hobby projects for fun! And it's really
                                affordable, very humble guys!!!"
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {open && <UpdateProfileDialog open={open} onClose={handleOpen} />}
        </>
    );
};

export default ProfilePage;