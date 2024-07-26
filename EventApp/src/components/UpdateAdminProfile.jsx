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
import { updateAdminProfile, FetchAdminProfile } from '../store/FetchAdminSlice';


const UpdatingAdminProfile = ({ open, onClose }) => {
  const { adminInfo } = useSelector(state => state.admin);

  const [adminData, setAdminData] = useState({
    username: adminInfo?.username || '',
    organizername: adminInfo?.organizername || '',
    email: adminInfo?.email || '',
    linkedIn: adminInfo?.linkedIn || '',
    website: adminInfo?.website || '',
    github: adminInfo?.github || '',
    instagram: adminInfo?.instagram || '',
    image: adminInfo?.image || null,
  });

  useEffect(() => {
    if (adminInfo) {
      setAdminData({
        username: adminInfo.username || '',
        organizername: adminInfo.organizername || '',
        email: adminInfo.email || '',
        linkedIn: adminInfo.linkedIn || '',
        website: adminInfo.website || '',
        github: adminInfo.github || '',
        instagram: adminInfo.instagram || '',
        image: adminInfo.image || null,
      });
    }
  }, [adminInfo]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdminData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateAdminProfile(adminData));
      dispatch(FetchAdminProfile()); // Re-fetch updated profile data
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
        <Card className="mx-auto w-full max-w-[24rem] overflow-y-scroll h-screen">
          <Button variant="gradient" type="button" className='w-20 h-8 items-center' onClick={handleClose}>
            Close
          </Button>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update Profile
            </Typography>
            <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
              Change Username, Email, LinkedIn, Website, GitHub, Instagram & Profile Picture
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Username
            </Typography>
            <Input name="username" label="Username" size="lg" value={adminData.username} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              organizername
            </Typography>
            <Input name="organizername" label="organizername" size="lg" value={adminData.organizername} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input name="email" label="Email" size="lg" value={adminData.email} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              LinkedIn
            </Typography>
            <Input name="linkedIn" label="LinkedIn" size="lg" value={adminData.linkedIn} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Website
            </Typography>
            <Input name="website" label="Website" size="lg" value={adminData.website} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              GitHub
            </Typography>
            <Input name="github" label="GitHub" size="lg" value={adminData.github} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Instagram
            </Typography>
            <Input name="instagram" label="Instagram" size="lg" value={adminData.instagram} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Profile Picture
            </Typography>
            <div>
              {adminInfo.image ? (
                <img src={adminInfo.image} alt=" Profile Image all ready Uploaded" />
              ) : (
                <Input
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
              )}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
              Update Profile
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Dialog>
  );
};

export default UpdatingAdminProfile;
