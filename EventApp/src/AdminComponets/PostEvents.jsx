import {
  Button, Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
  Input,
  Radio,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaGlobe, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FetchAdminProfile } from '../store/FetchAdminSlice';
import EventSclice, { postEvent, fetchEventsById } from '../store/EventSclice';  // Corrected the import path
import CustomRadioGroup from '../components/CustomRadioButton';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostEvents = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { adminInfo } = useSelector(state => state.admin);

  const event = useSelector(state => state.event)
  const navigate = useNavigate()



  const fetchAdminData = async () => {
    try {
      await dispatch(FetchAdminProfile());
      await dispatch(fetchEventsById())
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostEvents = () => {
    setOpenDialog(!openDialog);
  };

  const [eventData, setEventData] = useState({
    eventname: '',
    category: '',
    postDate: '',
    lastDate: '',
    Eventdate: '',
    description: '',
    location: '',
    price: '',
    status: 'upcoming',
    image: null,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(eventData);
      await dispatch(postEvent(eventData));
      toast.success('🦄 Successed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpenDialog(false);
      navigate('/PostEvents')
      // Optionally, handle success (e.g., show a success message or close dialog)
    } catch (error) {
      toast.error('🦄 Please filed all requirment', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleStatusChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      status: e.target.value,
    }));
  };
  const handleCategoryChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };


  return (
    <>
      <div className='m-10 flex-wrap flex flex-3 justify-center'>
        <ToastContainer />
        {/* POSTED EVENTS */}



        {event && event.data && event.data.length > 0 ? (event.data.map((e) => {
          return <Card className="w-96 m-4 justify-center items-center" key={e?._id}>
            <CardHeader floated={false} className="h-auto">
              <img src={`http://localhost:9999/uploads/${e?.image}`} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {e?.eventname}
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                {adminInfo.organizername}
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                {e?.Category}
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                {e?.postDate} - {e?.lastDate}
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
              <Typography color="blue-gray" className="font-bold bg-blue-gray-400" textGradient>
                Status: <span className='text-xl text-yellow-900'>{e?.status}</span>
              </Typography>
            </CardBody>

            <Button variant="gradient" type="submit" className='mb-2'  >
              Read More
            </Button>
          </Card>
        })) :
          (
            <Typography variant="h4" color="red" className="text-center mt-4">
              Nothing event available
            </Typography>
          )
        }




        {/* POST EVENT */}
        <Dialog
          size="xs"
          open={openDialog}
          handler={handlePostEvents}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem] overflow-y-scroll h-screen">
            <form onSubmit={handleSubmit}>
              <CardHeader floated={false} className="h-52">
               
                <div>
                  {event.data.image ? (
                    <img src={event.data.image} alt=" Profile Image all ready Uploaded" />
                  ) : (
                    <Input
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                  )}
                </div>
              </CardHeader>
              <CardBody className="text-center mb-1">
                <Typography variant="h4" color="blue-gray" className="mb-2" >
                  Post Event
                </Typography>
                <Typography className="mt-2" variant="h6">
                  Event Name
                </Typography>
                <Input name="eventname" label="Event Name" size="lg" onChange={handleInputChange} required />

                <Typography className="mt-2" variant="h6">
                  Category
                </Typography>
                <div onChange={handleCategoryChange} className='flex flex-row m-2' required>
                  <input type="radio" value="college events" name="category" className='font-bold' /> College Events
                  <input type="radio" value="company events" name="category" className='' /> Company Events
                  <input type="radio" value="government/city events" name="category" className='' /> Government/City Events
                </div>


                <Typography className="mt-2" variant="h6">
                  Description
                </Typography>
                <Input name="description" label="description" size="lg" onChange={handleInputChange} />
                <Typography className="mt-2" variant="h6">
                  Post Date
                </Typography>
                <Input name="postDate" type="date" label="Post Date" size="lg" onChange={handleInputChange} required />
                <Typography className="mt-2" variant="h6">
                  Last Date
                </Typography>
                <Input name="lastDate" type="date" label="Last Date" size="lg" onChange={handleInputChange} required />
                <Typography className="mt-2" variant="h6">
                  Event-Date
                </Typography>
                <Input name="Eventdate" label="Eventdate" size="lg" onChange={handleInputChange} required />
                <Typography className="mt-2" variant="h6">
                  Location
                </Typography>
                <Input name="location" label="Location" size="lg" onChange={handleInputChange} required />
                <Typography className="mt-2" variant="h6">
                  Price
                </Typography>
                <Input name="price" label="Price" size="lg" onChange={handleInputChange} required />
                <Typography className="mt-2" variant="h6">
                  Status
                </Typography>
                <CustomRadioGroup
                  required
                  value={eventData.status}
                  onChange={handleStatusChange}
                  options={[
                    { value: 'ongoing', label: 'Ongoing' },
                    { value: 'upcoming', label: 'Upcoming' },
                    { value: 'complete', label: 'Complete' },
                  ]}
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" type="submit" fullWidth>
                  Post Event
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Dialog>

        <div className='fixed bottom-0 right-0 mb-8 mr-8 z-10'>
          <Button onClick={handlePostEvents}>
            Create New Event
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostEvents;
