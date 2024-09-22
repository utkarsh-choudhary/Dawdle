import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      // Sending the mail to the backend to generate and send OTP
      const response = await axios.post('http://examples:5000/', { email });
      if (response.status === 200) {
        setOtpSent(true);
        setError('');
        alert('OTP sent to your email!');
      }
    } catch (error) {
      setError('Error sending OTP. Please try again.');
      console.error(error);
    }
  };

  //verifying otp
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://example:5000/ve', { email, otp });
      if (response.status === 200) {
        setOtpVerified(true);
        setError('');
        alert('OTP Verified! You are now logged in.');
      }
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen '>
        <div className="w-[30vw] h-[60vh] border flex flex-col rounded-2xl
        justify-center items-center  hover:shadow-2xl opacity-90 transition duration-200
        hover:border-[#6653FF] bg-gray-200 ">

        <img src='../login logo.png' className='w-24 p-2 mb-8'/>

        {!otpVerified ? (
          <>
            {/* Email Input */}
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-80 p-4 border-2 rounded-xl hover:border-[#6653FF] placeholder:text-lg shadow-2xl hover:opacity-80'
            />

            {/* Show Send OTP button if OTP is not sent yet */}
            {!otpSent ? (
              <button
                className='text-white bg-[#6653FF] mt-4 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:bg-[#4b3bb3] hover:shadow-xl'
                onClick={handleSendOtp}
              >
                Enter OTP
              </button>
            ) : (
              <div className='flex flex-col items-center'>
                {/* OTP Input */}
                <input
                  type="text"
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-96 p-4 border-2 mt-4 rounded-3xl hover:border-[#6653FF] placeholder:text-lg shadow-2xl'
                />
                <button
                className='bg-[#6653FF] rounded-md p-2 text-white hover:bg-[#4b3bb3] hover:shadow-xl transition duration-200 ease-in-out transform active:scale-95'
                onClick={handleVerifyOtp}
                >
                Submit OTP
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-green-500">You are logged in!</p>
        )}

        {/* Link to Signup */}
        <p className='text-black-400 mt-2 text-center p-2'>
          Don't have an account? <Link to="" className='text-[#4b3bb3]'>Sign up</Link>
        </p>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}
        
         </div>
    </div>
  )
}

export default Login