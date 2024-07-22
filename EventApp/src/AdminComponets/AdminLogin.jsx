import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input } from "@material-tailwind/react";
import { loginAdmin } from '../store/FetchAdminSlice';
import { toast, ToastContainer } from 'react-toastify';

const AdminLogin = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const resultAction = await dispatch(loginAdmin({ email, AdminCode: password }));
      //console.log({resultAction});
      if(resultAction.payload.success){
        toast.success("Succesfully login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       // console.log(resultAction.payload.authToken);
        setOpen(false);
        localStorage.setItem("authToken",resultAction.payload.authToken)
        navigate('/')
        
      }else{
        setError(resultAction.payload)
        toast.error(resultAction.payload, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // if (loginAdmin.fulfilled.match(resultAction)) {
      //   setOpen(false);
      //   navigate('/');
      // } else {
      //   setError(resultAction.payload);
      // }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
    <Dialog
      size="xs"
      open={open}
      handler={handleClose}
      className="bg-transparent shadow-none"
      >
      <ToastContainer/>
      <Card className="mx-auto w-full max-w-[24rem]">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">Sign In</Typography>
            <Typography className="mb-3 font-normal" variant="paragraph" color="gray">Enter your email and password to Sign In.</Typography>
            <Typography className="-mb-2" variant="h6">Your Email</Typography>
            <Input label="Email" size="lg" value={email} required onChange={(e) => setEmail(e.target.value)} />
            <Typography className="-mb-2" variant="h6">Your Password</Typography>
            <Input label="Password" size="lg" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>Sign In</Button>
           
            {error && <Typography color="red" className="mt-2">{error}</Typography>}
          </CardFooter>
        </form>
      </Card>
    </Dialog>
    </>
  );
};

export default AdminLogin;
