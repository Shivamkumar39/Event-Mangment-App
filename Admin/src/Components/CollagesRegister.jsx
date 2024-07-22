import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar
} from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

const CollagesRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [secondAdmins, setSecondAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSecondAdmins = async () => {
    try {
      const authToken = localStorage.getItem('authToken');  // Retrieve auth token from localStorage or wherever it's stored

      const response = await fetch('http://localhost:9999/getAdminProfile', 
        {
        method: 'GET',
        headers: {
          authToken: `Bearer ${authToken}` // Corrected header name to Authorization
        }
      });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch admin profiles');
      // }

      const adminInfo = await response.json();

      if (Array.isArray(adminInfo)) {
        setSecondAdmins(adminInfo);
      } else {
        console.error('Fetch returned non-array data:', adminInfo);
        // Handle unexpected response format
      }
    } catch (error) {
      console.log('Error fetching second admins:', error);
      // Handle network errors or other exceptions
    }
  };

  useEffect(() => {
    fetchSecondAdmins();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9999/AdmiRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, AdminCode: adminCode })
      });

      if (response.ok) {
        alert('Second Admin registered successfully');
        fetchSecondAdmins(); // Refresh the list
      } else {
        alert('Error registering Second Admin');
      }
    } catch (error) {
      console.error('Error registering second admin:', error);
    }
  };

  const filteredAdmins = secondAdmins.filter(admin =>
    admin.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-row ml-5 max-h-screen'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Organizers
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleRegister}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Admin Name
            </Typography>
            <Input
              size="lg"
              placeholder="Admin Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Admin Email
            </Typography>
            <Input
              size="lg"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Admin Code
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Admin Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Sign Up
          </Button>
        </form>
      </Card>

      <div className='ml-20 w-[80%]'>
        <h2 className='font-bold text-xl'>Colleges Already Enrolled</h2>
        <div className="border-2 w-[40%] rounded-lg h-10 flex items-center px-2">
          <FaSearch className='m-3'/>
          <input
            type="text"
            className="w-full h-full rounded-lg focus:outline-none"
            placeholder="Search by School Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Card className="w-[100%] h-[70%]  overflow-y-scroll">
          <List>
            {filteredAdmins.map((adminInfo) => (
              <ListItem key={adminInfo._id}>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt={adminInfo.username}
                    src={adminInfo.image ? `http://localhost:9999/uploads/${adminInfo.image}` : `https://via.placeholder.com/150`}
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {adminInfo.username}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {adminInfo.email}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default CollagesRegister;
