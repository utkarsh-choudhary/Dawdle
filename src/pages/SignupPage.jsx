import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    first_name: '',
    last_name: '',
    linkedIn: '',
    company_name: '',
    designation: '',
    phone_number: '',
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showOrganizationFields, setShowOrganizationFields] = React.useState(false);

  const navigate = useNavigate();

  const handleOrganizationClick = () => {
    setShowOrganizationFields(true);
  };

  const handleIndividualClick = () => {
    setShowOrganizationFields(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    const { email, first_name, last_name, phone_number } = formData;
    if (!email || !first_name || !last_name || !phone_number || (showOrganizationFields && (!formData.company_name || !formData.designation))) {
      setLoading(false);
      setError("All fields are required.");
      return;
    }

    // Prepare data for API
    const data = {
      email,
      first_name, // Ensure this matches the backend
      last_name,  // Ensure this matches the backend
      linkedIn: formData.linkedIn,
      phone_number, // Ensure this matches the backend
      ...(showOrganizationFields && {
        company_name: formData.company_name, // Ensure this matches the backend
        designation: formData.designation,   // Ensure this matches the backend
      }),
    };

    try {
      const response = await axios.post('http://localhost:9000/api/users/signup', data);
      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err); // Log the error for debugging
      if (err.response && err.response.status === 500) {
        setError("Internal server error. Please try again later.");
      } else if (err.response && err.response.status === 400) {
        setError("Bad request. Please check the data you've entered.");
      } else {
        setError(err.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div>
            <img src="../logo.png" alt="Dawdle" className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Create your new account</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-around mb-4">
            <button
              type="button"
              className={`w-28 text-black border border-indigo-600 font-medium py-2 rounded-md transition ${
                !showOrganizationFields ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-700 hover:text-white'
              }`}
              onClick={handleIndividualClick}
            >
              Individual
            </button>
            <button
              type="button"
              className={`w-28 text-black border border-indigo-600 font-medium py-2 rounded-md transition ${
                showOrganizationFields ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-700 hover:text-white'
              }`}
              onClick={handleOrganizationClick}
            >
              Organization
            </button>
          </div>

          {showOrganizationFields && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  id="company_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Company Name"
                  required={showOrganizationFields}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="designation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Designation"
                  required={showOrganizationFields}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <input
              type="text"
              id="first_name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter First Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="last_name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Last Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="linkedIn"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter LinkedIn ID"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="phone_number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your phone number"
              required
              onChange={handleChange}
              maxLength={10}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default SignupPage;
