import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/fetchUserSlice';
import { Card, CardBody, Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  //user email:- shivamkumar950835@gmail.com
  //passowrd:- abcd@123
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate('/');
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 p-6">
        <h1 className=' font-bold '>Login:- Weclome Back !</h1>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-4"
            />
            <Button type="submit" className="mt-6" fullWidth disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:underline">
              Register as a new user
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
