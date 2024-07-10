import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/fetchUserSlice';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.username || !formData.email || !formData.password || !formData.mobile) {
      toast.error("Please fill in all fields");
      return;
    }
  

    setLoading(true);

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      setLoading(false);

      if (response.error) {
        if (response.error === 'This email is already used. Please login.') {
          toast.error('This email is already used. Please login.');
        } else {
          toast.error(response.error);
        }
      } else {
        localStorage.setItem('authToken', response.authToken);
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-20 sticky">
      <ToastContainer />
      <Card className="w-full max-w-[24rem] h-full flex flex-col">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="grid place-items-center px-4 py-8 text-center flex-shrink-0"
        >
          <div className="mb-4 h-20 p-6 text-white">
            <i className="fi fi-rr-users-alt"></i>
          </div>
          <label className='font-bold text-white'>Students Only</label>
        </CardHeader>
        <CardBody className="flex-grow overflow-y-auto p-6">
          <div value="Student" className="p-0">
            <form className="mt-3 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className='m-2'>
                <div className='mt-2'>
                  <label>UserName</label>
                  <Input
                    name='username'
                    placeholder="username"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-1"
                    onChange={handleChange}
                    value={formData.username}
                  />
                </div>

                <div className='mt-2'>
                  <label>Email</label>
                  <Input
                    type="email"
                    name='email'
                    placeholder="email"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-1"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                
                <div className='mt-2'>
                  <label>Password</label>
                  <Input
                    type="password"
                    name='password'
                    placeholder="password"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-1"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>

                <div className='mt-2'>
                  <label>Mobile</label>
                  <Input
                    name='mobile'
                    placeholder="mobile"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-1"
                    onChange={handleChange}
                    value={formData.mobile}
                  />
                </div>
              </div>
             <Button type="submit" size="lg" className='m-2' disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <p>Click for New Registration Only For Users <Link to='/login' className='underline font-bold text-black'>Login Already Account</Link></p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
