import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to send OTP
  const handleSendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Request OTP for the user
      const { data: otpResponse } = await axios.post("http://localhost:9000/api/users/signin", { email });
      
      if (otpResponse.success) {
        setOtpSent(true);
        setError("");
      } else {
        setError(otpResponse.message || "User not found. Please sign up first.");
      }
    } catch (err) {
      setError("An error occurred while sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Verify the OTP
      const { data: verifyResponse } = await axios.post("http://localhost:9000/api/users/verify", { email, code: otp });
      
      if (verifyResponse.success) {
        setOtpVerified(true);
        setError("");

        // Store the token in localStorage
        localStorage.setItem("token", verifyResponse.token);

        // Navigate to the home page or activation route
        navigate("/home");
      } else {
        setError(verifyResponse.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div>
            <img src="../logo.png" alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            {!otpSent ? "Let us supercharge your growth." : "Enter the OTP sent to your email."}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {!otpSent ? (
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <div className="mt-6 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        ) : !otpVerified ? (
          <div>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="mt-4 text-right">
              <Link to="#" className="text-indigo-600 text-sm hover:underline" onClick={handleSendOtp}>
                Resend OTP
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-green-500 text-center">
            <h3 className="text-xl font-bold">OTP Verified!</h3>
            <p>You are now logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
