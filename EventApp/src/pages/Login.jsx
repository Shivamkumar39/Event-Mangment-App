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
  const [type, setType] = useState("Student");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;

    setLoading(true);
    if (data.email && data.password) {
      try {
        const response = await dispatch(loginUser(data)).unwrap();
        localStorage.setItem("authToken", response.authToken);
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
        navigate('/');
        toast.success('🦄 Successfully logged in', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error(err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all fields");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-10">
      <ToastContainer />
      <Card className="w-full max-w-[24rem] h-full flex flex-col">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="grid place-items-center px-4 py-8 text-center flex-shrink-0"
        >
          <div className="mb-4 h-20 p-6 text-white">
            <div>
              <i className="fi fi-rr-users-alt"></i>
              <p>Student</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex-grow overflow-y-auto p-6">
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

            <Button size="lg" className='m-2' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Student Login'}
            </Button>
            {error && <div className="text-red-500">{error}</div>}
          </form>
          <p>Click for New Registration Only For Users <Link to='/register' className='underline font-bold text-black'>Register New User</Link></p>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
