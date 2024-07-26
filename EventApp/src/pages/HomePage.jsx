import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Carousel, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedEvents, fetchOngoingEvents, fetchUpcomingEvents } from '../store/EventOnStatus';
import { fetchAdminProfilesWithoutAuthtoken } from '../store/AdminInfowWithoitToken';
import { FaGithub, FaGlobe, FaInstagram, FaLinkedin } from 'react-icons/fa';
import puevents from '../assets/puevents.jpg'
import pufest from '../assets/pufest.avif'
import bobayevent from '../assets/bobayevent.jpeg'
const HomePage = () => {
  const dispatch = useDispatch();
  const { upcomingEvents, ongoingEvents, completedEvents } = useSelector((state) => state.Status);
  //const event = useSelector(state => state.event)
 // const { data: admins, status, error } = useSelector((state) => state.secondAdmin);
  const [eventType, setEventType] = useState('upcoming'); // state to track which type of events to show

  useEffect(() => {
    dispatch(fetchUpcomingEvents());
    dispatch(fetchOngoingEvents());
    dispatch(fetchCompletedEvents());
  }, [dispatch]);

  const renderEvents = (events) => {
    if (!events || events.length === 0) {
      return <Typography variant="h5" color="blue-gray" className="m-4">Data not available for this type</Typography>;
    }
    return events.map(event => (
      <Card key={event.id} className="w-96 m-4 justify-center items-center">
        <CardHeader floated={false} className="h-auto">
          <img src={`http://localhost:9999/uploads/${event.image}`} alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {event.eventname}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {event.organizername}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {event.Category}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {event.postDate} - {event.lastDate}
          </Typography>
            <Typography color="blue-gray" className="font-bold bg-blue-gray-400" textGradient>
             Status: <span className='text-xl text-yellow-900'>{event.status}</span> 
            </Typography>
        </CardBody>
        <Button variant="gradient" type="submit" className='mb-2'>
          Read More
        </Button>
        <Button variant="gradient" type="submit" className='mb-2'>
          Book Now
        </Button>
      </Card>
    ));
  };

  const getEventsToDisplay = () => {
    switch (eventType) {
      case 'ongoing':
        return ongoingEvents;
      case 'completed':
        return completedEvents;
      case 'upcoming':
      default:
        return upcomingEvents;
    }
  };

  return (
    <div className='mx-16 mt-4'>
      <Carousel loop={true} autoplay={true} className="rounded-xl w-full object-cover object-center shadow-xl">
        <figure className='h-[30rem] w-full'>
          <img
           src={puevents}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <Typography variant="h5" color="blue-gray">
                Event name
              </Typography>
              <Typography color="gray" className="mt-2 font-normal">
                Organizer name
              </Typography>
            </div>
          </figcaption>
        </figure>
        <figure className='h-[30rem] w-full'>
          <img
           src={pufest}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <Typography variant="h5" color="blue-gray">
                Event name
              </Typography>
              <Typography color="gray" className="mt-2 font-normal">
                Organizer name
              </Typography>
            </div>
          </figcaption>
        </figure>
        <figure className='h-[30rem] w-full'>
          <img
           src={bobayevent}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <Typography variant="h5" color="blue-gray">
                Event name
              </Typography>
              <Typography color="gray" className="mt-2 font-normal">
                Organizer name
              </Typography>
            </div>
          </figcaption>
        </figure>
      </Carousel>

      {/* Events Section */}
      <div className='flex flex-col gap-4 overflow-x-hidden justify-center items-center mt-16'>
        <h1 className='font-bold text-5xl font-serif'>Events</h1>
        <div className=''>
          <Button onClick={() => setEventType('upcoming')} className='ml-2 bg-transparent text-black' >Upcoming Events</Button>
          <Button onClick={() => setEventType('ongoing')} className='ml-2 bg-transparent text-black' >Ongoing Events</Button>
          <Button onClick={() => setEventType('completed')} className='ml-2 bg-transparent text-black' >Completed Events</Button>
        </div>
        <div className='flex flex-wrap justify-center'>
          {renderEvents(getEventsToDisplay())}
        </div>
      </div>



      {/* Top company Organize Events/ Hackthon /  WorkShops */}
      <div className='justify-center items-center mt-10'>

        <h1 className='text-center text-3xl font-bold font-serif'>Top company /  Collages </h1>
        <div className='flex flex-row '>
        <Card className="w-96 m-4 justify-center items-center">
        <CardBody className="text-center">
          <label>Parul university</label>
        </CardBody>
        </Card>

        <Card className="w-96 m-4 justify-center items-center">
        <CardBody className="text-center">
          <label>Google</label>
        </CardBody>
        </Card>


        <Card className="w-96 m-4 justify-center items-center">
        <CardBody className="text-center">
          <label>IIT Delhi</label>
        </CardBody>
        </Card>

        <Card className="w-96 m-4 justify-center items-center">
        <CardBody className="text-center">
          <label>Indor.M.C</label>
        </CardBody>
        </Card>

        </div>

      </div>


      <div className='justify-center items-center mt-10'>
        <h1 className='text-center text-3xl font-bold font-serif'>Blogs</h1>
      </div>

    </div>
  );
};

export default HomePage;
