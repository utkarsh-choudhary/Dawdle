import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ProspectDetails() {
  const { state } = useLocation();
  const { formData } = state || {};  // formData from previous step

  const [prospectDetails, setProspectDetails] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    designation: ''
  });

  const handleChange = (e) => {
    setProspectDetails({
      ...prospectDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/example', {
        ...formData,
        ...prospectDetails,
      });
  
      if (response.status === 200) {
        // Booking was successful, you can optionally fetch updated stats here
        fetchMeetingStats();
      } else {
        console.error('Booking failed');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  return (
    
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Book Meeting - Step 2</h2>

      <form>
        <input 
          type="text" 
          name="name" 
          placeholder="Name of Prospect" 
          value={prospectDetails.name}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email ID" 
          value={prospectDetails.email}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone Number" 
          value={prospectDetails.phone}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="linkedin" 
          placeholder="LinkedIn ID" 
          value={prospectDetails.linkedin}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="designation" 
          placeholder="Designation" 
          value={prospectDetails.designation}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />

        {/* Calendly Link */}
        <a 
          href="https://calendly.com/your-calendly-link" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-indigo-600 text-white px-4 py-2 rounded inline-block mt-4"
        >
          Book Meeting on Calendly
        </a>

        <button 
          type="button" 
          onClick={handleSubmit} 
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProspectDetails;
