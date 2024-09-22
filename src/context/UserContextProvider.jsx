import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    companyName: '',
    productName: '',
    description: '',
    useCases: []
  });

  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch data from backend API using axios
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/company/create');
        setUser(response.data); // Assuming the API response has the required data structure
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchUserData(); // Call the function when the component mounts
  }, []);

  // Loading and error handling can be implemented in your UI as needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
