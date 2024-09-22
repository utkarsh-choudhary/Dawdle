import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  // Meeting statistics state
  const [meetingStats, setMeetingStats] = useState({
    requested: 0,
    scheduled: 0,
    cancelled: 0,
    completed: 0,
    converted: 0,
  });

  useEffect(() => {
    // Fetch meeting stats from backend when component mounts
    fetchMeetingStats();
  }, []);

  const fetchMeetingStats = async () => {
    try {
      // Using axios to fetch meeting stats from the API
      const response = await axios.get('/api/meetings/stats');
      setMeetingStats(response.data);
    } catch (error) {
      console.error('Failed to fetch meeting stats', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-8">Meeting Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Meeting Requested</h3>
          <p className="text-3xl font-bold mt-2">{meetingStats.requested}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Meetings Scheduled</h3>
          <p className="text-3xl font-bold mt-2">{meetingStats.scheduled}</p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Meetings Cancelled</h3>
          <p className="text-3xl font-bold mt-2">{meetingStats.cancelled}</p>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Meetings Completed</h3>
          <p className="text-3xl font-bold mt-2">{meetingStats.completed}</p>
        </div>

        <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Meetings Converted</h3>
          <p className="text-3xl font-bold mt-2">{meetingStats.converted}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
