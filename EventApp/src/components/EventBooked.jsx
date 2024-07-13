import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { HomeIcon, Cog6ToothIcon, CalendarIcon } from '@heroicons/react/24/solid'

const ProfileCard = () => {
  return (
    <div className="justify-center rounded-md text-black  flex flex-row items-center">
     <div className='relative w-[50%] rounded-md text-black h-[30%] '>
     <Card className="w-full flex flex-row items-center">
        <CardHeader floated={false} className="w-1/3 h-auto mb-1">
          <img
            src="https://docs.material-tailwind.com/img/team-3.jpg" //event thumbnail
            alt="profile-picture"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody className="w-2/3 text-left p-4">
          <Typography variant="h4" color="blue-gray" className="mb-2 flex flex-row ">
            <CalendarIcon className='h-4 w-4 m-2'/>
           
            Event Name
          </Typography>
          <Typography variant="h5" color="blue-gray" className="font-medium mb-2 flex flex-row">
            <HomeIcon className='h-4 w-4 m-2'/>
            Event Organizer
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            event post Date
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Event last Date
          </Typography>
        </CardBody>
      </Card>
     </div>
    </div>
  );
};

export default ProfileCard;
