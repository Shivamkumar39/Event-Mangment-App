import { CardFooter, Button, Input } from '@material-tailwind/react';
import logoPng from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const MyCardFooter = () => (
  <CardFooter className='border-4 border-gray-500 p-6'>
    <div className="flex flex-wrap justify-between items-start">
      <div className="flex flex-col  m-3">
        <img src={logoPng} className='w-24 h-24 mb-6'/>
        <p className='font-serif font-bold mb-1'>* College Events</p>
        <p className='font-serif font-bold mb-1'>* Company Events</p>
        <p className='font-serif font-bold mb-1'>* Government Events</p>
      </div>

      <div className='flex flex-col items-start m-3'>
        <h3 className='font-serif text-black mb-4 text-xl '> &#128073; Latest Events/Hackathon</h3>
        <p className='mb-1 ml-3'>* Upcoming</p>
        <p className='mb-1 ml-3'>* Ongoing</p>
      </div>

      <div className='flex flex-col items-start m-3'>
        <h3 className='font-serif text-black mb-4 text-xl '> &#128073; About Me</h3>
        <p className='mb-1'>Contact us</p>
      </div>

      <div className='flex flex-col items-start m-3'>
        <h3 className='font-serif text-black mb-4 text-xl '>Submit Enquiry</h3>
        <div className='flex items-center'>
          <Input type='text' className='border-2 border-yellow-400 mr-2'/>
          <Button>Submit</Button>
        </div>
      </div>
    </div>

    <div className='border-t-2 border-gray-500 mt-6'></div>

    <div className='text-center mt-6'>
      <h2 className='text-center font-bold'> &#128329; Welcome Event World <span className='text-red-500'>copyRight</span> &#169; Reserved </h2>
      <div className='flex justify-center mt-4 space-x-4'>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faTwitter} size='2x' className='text-blue-600'/>
        </a>
        <a href='https://github.com/Shivamkumar39?tab=repositories' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faGithub} size='2x' className='text-blue-400'/>
        </a>
        <a href='https://www.linkedin.com/in/barad-manashvi/' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faLinkedin} size='2x' className='text-pink-500'/>
        </a>
        <a href='https://www.linkedin.com/in/shivam-kumar--/' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faLinkedin} size='2x' className='text-blue-700'/>
        </a>
      </div>
    </div>
  </CardFooter>
);

export default MyCardFooter;
