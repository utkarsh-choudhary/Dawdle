import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Modal from 'react-modal';
import UserContext from '../../context/UserContext';

Modal.setAppElement('#root'); // Accessibility

function Card() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQualificationsModalOpen, setIsQualificationsModalOpen] = useState(false);
  const { user } = useContext(UserContext); // Use context for dynamic product data

  // Modal open/close functions
  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);
  const openQualificationsModal = () => setIsQualificationsModalOpen(true);
  const closeQualificationsModal = () => setIsQualificationsModalOpen(false);

  return (
    <div className='flex justify-center items-center px-4'>
      <div className="relative w-full sm:w-[80vw] lg:w-[60vw] mt-4 h-[40vh] sm:h-[30vh] lg:h-[30vh] 
        border flex flex-col opacity-90 shadow-2xl transition transform 
        hover:scale-105 duration-300">

        {/* Play Button */}
        <button 
          onClick={openVideoModal}
          className='absolute top-4 right-2 rounded-md bg-gray-300 p-2 w-12 h-12 
          text-white flex justify-center items-center hover:text-black hover:bg-gray-700'>
          <FaPlay />
        </button>

        {/* Company and Product Info - Using Context Values */}
        <p className='ml-4 mt-2 text-sm sm:text-md lg:text-lg text-indigo-600'>{user.companyName}</p>
        <h2 className='p-2 ml-4 text-xl sm:text-2xl lg:text-2xl text-indigo-600'>{user.productName}</h2>
        <p className='ml-4 text-sm sm:text-md lg:text-lg'>{user.description}</p>

        {/* Links */}
        <div className='flex ml-4'>
          <button 
            onClick={openQualificationsModal} 
            className='p-2 text-sm sm:text-md lg:text-lg text-indigo-600 hover:underline'>
            View Qualifications
          </button>
          <Link to="/negative-prospect-list">
            <button className='p-2 text-sm sm:text-md lg:text-lg text-indigo-600 hover:underline ml-4'>
              View Negative Prospect List
            </button>
          </Link>
        </div>

        {/* Schedule Button */}
        <Link to="/book-meeting">
          <button 
            className='rounded-full bg-indigo-600 p-2 w-40 sm:w-48 lg:w-60 flex justify-center 
            items-center ml-auto mr-2 mt-auto hover:bg-indigo-950 text-white mb-2'>
            Book Meeting
          </button>
        </Link>
      </div>

      {/* Modal for Video */}
      <Modal
        isOpen={isVideoModalOpen}
        onRequestClose={closeVideoModal}
        contentLabel="Product Video Modal"
        className="bg-white w-full h-full flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
      >
        <div className="relative bg-white w-11/12 max-w-5xl p-4 rounded-lg flex flex-col sm:flex-row">
          {/* Close Button */}
          <button 
            onClick={closeVideoModal} 
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-400 w-10 h-10 rounded-full p-2">
            X
          </button>

          {/* Left Column: Video and Details */}
          <div className="w-full sm:w-2/3 flex flex-col">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-center mb-4">{user.productName} - Product Video</h2>
            
            {/* Video Placeholder */}
            <div className="w-full h-64 bg-gray-300 flex justify-center items-center">
              <p className="text-gray-500">Video Player Placeholder</p>
            </div>

            {/* Product Details */}
            <div className="mt-4">
              <p className="text-lg sm:text-xl">{user.description}</p>
              <p className="text-sm sm:text-md mt-2">Product Details/Features/Problem Solved</p>
            </div>
          </div>

          {/* Right Column: Relevant Use Cases */}
          <div className="w-full sm:w-1/3 flex flex-col justify-start pl-6">
            <h3 className="text-md sm:text-lg mb-4">Relevant Use Cases:</h3>
            <ul className="text-sm sm:text-md list-disc ml-4">
              {user.useCases.map((useCase, index) => (
                <li key={index}>
                  <a href="#" className="hover:underline">{useCase}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      {/* Modal for Qualifications */}
      <Modal
        isOpen={isQualificationsModalOpen}
        onRequestClose={closeQualificationsModal}
        contentLabel="Qualifications Modal"
        className="bg-white w-full h-auto p-4 rounded-lg max-w-5xl"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
      >
        <div className="relative w-full p-4">
          {/* Close Button */}
          <button 
            onClick={closeQualificationsModal} 
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-400 w-10 h-10 rounded-full p-2">
            X
          </button>

          <h2 className="text-xl sm:text-2xl text-center mb-4">Qualifications</h2>

          {/* First Table: Static Qualification Criteria */}
          <div className="mb-6">
            <h3 className="text-md sm:text-lg mb-4">Qualification Criteria</h3>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Geo</th>
                  <th className="py-2 px-4 border">Industries</th>
                  <th className="py-2 px-4 border">Depts</th>
                  <th className="py-2 px-4 border">Levels</th>
                  <th className="py-2 px-4 border">Size</th>
                  <th className="py-2 px-4 border">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border">US</td>
                  <td className="py-2 px-4 border">Tech</td>
                  <td className="py-2 px-4 border">IT</td>
                  <td className="py-2 px-4 border">Manager</td>
                  <td className="py-2 px-4 border">500+</td>
                  <td className="py-2 px-4 border">$1M+</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Second Table: Advanced Qualification */}
          <div className="mb-6">
            <h3 className="text-md sm:text-lg mb-4">Advanced Qualification</h3>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Questions</th>
                  <th className="py-2 px-4 border">Answers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border">Which cloud services is the company using?</td>
                  <td className="py-2 px-4 border">Azure, Local Cloud, XYZ Cloud, We Cloud</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">What is their cloud expenditure?</td>
                  <td className="py-2 px-4 border">&gt;10 USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Proceed to Book Meeting Button */}
          <div className="text-center">
            <Link to="/book-meeting">
              <button 
                className='rounded-full bg-indigo-600 p-2 w-40 sm:w-48 lg:w-60 flex justify-center 
                items-center hover:bg-indigo-950 text-white'>
                Proceed to Book Meeting
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Card;
