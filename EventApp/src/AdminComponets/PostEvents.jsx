import {
  Button, Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { FaGithub, FaGlobe, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FetchAdminProfile } from '../store/FetchAdminSlice';

const PostEvents = () => {

  const dispatch = useDispatch();
  const { adminInfo, loading, error } = useSelector(state => state.admin);
  const fetchAdminData = async()=>{
    try {
      
      const response = await dispatch(FetchAdminProfile());
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchAdminData();
  },[])
  return (
    <>
      <div className='m-10'>
        <Card className="w-96">
          <CardHeader floated={false} className="h-80">
            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Event name
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              Organizer name
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              Catagery
            </Typography>

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

          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">

          </CardFooter>
        </Card>

        <div className='fixed bottom-0 right-0 mb-8 mr-8 z-10'>
          <Button>
            Create New Post
          </Button>
        </div>

      </div>
    </>
  )
}

export default PostEvents