import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  CardFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { updateUserProfile } from '../store/fetchUserSlice';

const UpdateProfileDialog = ({ open, onClose }) => {
  const { userInfo } = useSelector(state => state.user);
  const [profileData, setProfileData] = useState({
    username: userInfo?.username || '',
    email: userInfo?.email || '',
    mobile: userInfo?.mobile || '',
    image: userInfo?.image || null,
  });

  useEffect(() => {
    if (userInfo) {
      setProfileData({
        username: userInfo.username || '',
        email: userInfo.email || '',
        mobile: userInfo.mobile || '',
        image: userInfo.image || null,
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateUserProfile(profileData));
      onClose(); // Close the dialog after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error as needed
    }
  };

  const handleClose = () => onClose();

  return (
    <Dialog size="xs" open={open} onClose={onClose} className="bg-transparent shadow-none">
      <form onSubmit={handleSubmit} >
        <Card className="mx-auto w-full max-w-[24rem]">
        <Button variant="gradient" type="button" className='w-20 h-8 items-center' onClick={handleClose}>
        Close
      </Button>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update Profile
            </Typography>
            <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
              Change Username, Email & Mobile Number
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Username
            </Typography>
            <Input name="username" label="Username" size="lg" value={profileData.username} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input name="email" label="Email" size="lg" value={profileData.email} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Mobile No.
            </Typography>
            <Input name="mobile" label="Mobile" size="lg" value={profileData.mobile} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Profile Picture
            </Typography>
            <Input name="image" type="file" onChange={handleImageChange} />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
              Update Profile
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography as="a" href="#signup" variant="small" color="blue-gray" className="ml-1 font-bold" onClick={handleClose}>
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
     
        </Card>
      </form>
    </Dialog>
  );
};

export default UpdateProfileDialog;
