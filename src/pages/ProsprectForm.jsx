import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProspectForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    geo: '',
    industries: '',
    dept: '',
    role: '',
    size: '',
    revenue: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    // Save formData in localStorage or Context API if needed
    navigate('/prospect-details', { state: { formData } });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Book Meeting - Step 1</h2>

      <form>
        <input 
          type="text" 
          name="companyName" 
          placeholder="Enter the name of the Prospect Company" 
          value={formData.companyName}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="geo" 
          placeholder="Enter Geo" 
          value={formData.geo}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="industries" 
          placeholder="Industries" 
          value={formData.industries}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="dept" 
          placeholder="Dept" 
          value={formData.dept}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="role" 
          placeholder="Role" 
          value={formData.role}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="size" 
          placeholder="Size" 
          value={formData.size}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input 
          type="text" 
          name="revenue" 
          placeholder="Revenue" 
          value={formData.revenue}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />

        <button 
          type="button" 
          onClick={handleNext} 
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ProspectForm;
