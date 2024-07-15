import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/fetchUserSlice';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LockClosedIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [adminData, setAdminData] = useState({ email: '', adminID: '' });
  const [type, setType] = useState("Student");
  const dispatch = useDispatch();
  const [loadings, setLoadings] = useState(false)
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (type === "Student") {
      setFormData({ ...formData, [name]: value });
    } else {
      setAdminData({ ...adminData, [name]: value });
    }
  };

  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = type === "Student" ? formData : adminData;

    // Check if fields are filled
    setLoadings(true)
    if (data.email && data.password) {
      // await dispatch(loginUser(data))
      //   .unwrap()
      //   .then(() => {
      //     navigate('/');
      //     toast.success('🦄 Successfully logged in', {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //     localStorage.setItem('authToken', response.authToken);

      //   })
      //   .catch((err) => {
      //     toast.error(err.message)
      //     setLoadings(false)
      //        // Display error message using toast
      //   });
      const response = await dispatch(loginUser(data));
      if (response.payload) {
        console.log(response.payload.authToken);
        localStorage.setItem("authToken", response.payload.authToken)
        navigate('/')
      }
      setLoadings(false)
    } else {
      alert("Please fill in all fields");
      setLoadings(false)

    }

  };

  return (
    <div  className="flex justify-center items-center h-screen mt-10">
      <ToastContainer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
      {/* Same as */}
      <ToastContainer /> {/* Container for displaying toasts */}
      <Card className="w-full max-w-[24rem] h-full flex flex-col">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="grid place-items-center px-4 py-8 text-center flex-shrink-0"
        >
          <div className="mb-4 h-20 p-6 text-white">
            {type === "Student" ? (
              <div>
                <i className="fi fi-rr-users-alt"></i>
                <p>Student</p>
              </div>
            ) : (
              <div>
                <i className="fi fi-rr-admin-alt"></i>
                <p>Admin Only</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody className="flex-grow overflow-y-auto p-6">
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 overflow-hidden justify-center items-center">
              <Tab value="Student" onClick={() => setType("Student")}>
                Student
              </Tab>
              <Tab value="admin" onClick={() => setType("admin")}>
                Admin/Event Organizer
              </Tab>
            </TabsHeader>
            <TabsBody
              className=""
              animate={{
                initial: {
                  x: type === "Student" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "Student" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="Student" className="p-0">
                <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className='m-2'>
                    <label>Email</label>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      name='email'
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                    <div className='mt-2'>
                      <label>Password</label>
                      <Input
                        type="password"
                        maxLength={19}
                        name='password'
                        placeholder="password"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-1"
                        onChange={handleChange}
                        value={formData.password}
                        required
                      />
                    </div>
                  </div>

                  <Button size="lg" className='m-2' type="submit" disabled={loadings}>
                    {loadings ? 'Loading...' : 'Student Login'}
                  </Button>
                  {error && <div className="text-red-500">{error}</div>}
                </form>
                <p>Click for New Registration Only For Users <Link to='/register' className='underline font-bold text-black'>Register New User</Link></p>
              </TabPanel>

              <TabPanel value="admin" className="p-0">
                <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <label>Admin Email</label>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      name='email'
                      onChange={handleAdminChange}
                      value={adminData.email}
                    />
                  </div>
                  <div className="my-6">
                    <label>Admin ID</label>
                    <Input
                      placeholder="0000"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      name='adminID'
                      onChange={handleAdminChange}
                      value={adminData.adminID}
                    />
                  </div>
                  <Button size="lg" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Admin Login'}
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Admin can login Only With Admin Option
                  </Typography>
                  <p>Admin ID Provided By <Link to='' className='underline font-bold text-blue-gray-900'>Owner</Link> Then You Login </p>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
