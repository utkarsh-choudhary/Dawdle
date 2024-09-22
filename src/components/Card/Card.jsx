import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Modal from 'react-modal';
import UserContext from '../../context/UserContext';

Modal.setAppElement('#root'); // Accessibility

function Card() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQualificationsModalOpen, setIsQualificationsModalOpen] = useState(false);

  // Qualification state
  const [geo, setGeo] = useState('');
  const [industries, setIndustries] = useState('');
  const [depts, setDepts] = useState('');
  const [levels, setLevels] = useState('');
  const [size, setSize] = useState('');
  const [revenue, setRevenue] = useState('');

  // Advanced qualifications state
  const [targetMarket, setTargetMarket] = useState('');
  const [productFit, setProductFit] = useState('');
  const [growthPotential, setGrowthPotential] = useState('');

  const { user } = useContext(UserContext);

  // Modal open/close functions
  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);
  const openQualificationsModal = () => setIsQualificationsModalOpen(true);
  const closeQualificationsModal = () => setIsQualificationsModalOpen(false);

  // Validation to check if all fields are filled
  const isFormValid = () => {
    return (
      geo &&
      industries &&
      depts &&
      levels &&
      size &&
      revenue &&
      targetMarket &&
      productFit &&
      growthPotential
    );
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div
        className="relative w-full sm:w-[80vw] lg:w-[60vw] mt-4 h-[40vh] sm:h-[30vh] lg:h-[30vh]
        border flex flex-col opacity-90 shadow-2xl transition transform
        hover:scale-105 duration-300"
      >
        {/* Play Button */}
        <button
          onClick={openVideoModal}
          className="absolute top-4 right-2 rounded-md bg-gray-300 p-2 w-12 h-12
          text-white flex justify-center items-center hover:text-black hover:bg-gray-700"
        >
          <FaPlay />
        </button>

        {/* Company and Product Info */}
        <p className="ml-4 mt-2 text-sm sm:text-md lg:text-lg text-indigo-600">{user.companyName}</p>
        <h2 className="p-2 ml-4 text-xl sm:text-2xl lg:text-2xl text-indigo-600">{user.productName}</h2>
        <p className="ml-4 text-sm sm:text-md lg:text-lg">{user.description}</p>

        {/* Links */}
        <div className="flex ml-4">
          <button
            onClick={openQualificationsModal}
            className="p-2 text-sm sm:text-md lg:text-lg text-indigo-600 hover:underline"
          >
            View Qualifications
          </button>
          <Link to="/negative-prospect-list">
            <button className="p-2 text-sm sm:text-md lg:text-lg text-indigo-600 hover:underline ml-4">
              View Negative Prospect List
            </button>
          </Link>
        </div>

        {/* Schedule Button */}
        <Link to="/book-meeting">
          <button
            disabled={!isFormValid()} // Disabled until form is completed
            className={`rounded-full bg-indigo-600 p-2 w-40 sm:w-48 lg:w-60 flex justify-center
            items-center ml-auto mr-2 mt-auto hover:bg-indigo-950 text-white mb-2 ${
              isFormValid() ? '' : 'cursor-not-allowed bg-gray-300'
            }`}
          >
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
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-400 w-10 h-10 rounded-full p-2"
          >
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
                  <a href="#" className="hover:underline">
                    {useCase}
                  </a>
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
        className="bg-white w-full max-h-[80vh] overflow-auto p-4 rounded-lg" // Set max height and allow scrolling
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
      >
        <div className="relative w-full p-4">
          {/* Close Button */}
          <button
            onClick={closeQualificationsModal}
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-400 w-10 h-10 rounded-full p-2"
          >
            X
          </button>

          <h2 className="text-xl sm:text-2xl text-center mb-4">Qualifications</h2>

          {/* Table Structure */}
          <table className="min-w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Geo</th>
                <th className="border p-2">Industries</th>
                <th className="border p-2">Departments</th>
                <th className="border p-2">Levels</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <select value={geo} onChange={(e) => setGeo(e.target.value)} className="border p-2">
                    <option value="">Select Geo</option>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="EU">EU</option>
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={industries}
                    onChange={(e) => setIndustries(e.target.value)}
                    className="border p-2"
                    placeholder="Industries"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={depts}
                    onChange={(e) => setDepts(e.target.value)}
                    className="border p-2"
                    placeholder="Departments"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={levels}
                    onChange={(e) => setLevels(e.target.value)}
                    className="border p-2"
                    placeholder="Levels"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="border p-2"
                    placeholder="Company Size"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className="border p-2"
                    placeholder="Revenue"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Advanced Qualifications Section */}
          <h3 className="text-lg mt-6 mb-2">Advanced Qualifications</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              className="border p-2 w-full"
              placeholder="Target Market"
            />
            <input
              type="text"
              value={productFit}
              onChange={(e) => setProductFit(e.target.value)}
              className="border p-2 w-full"
              placeholder="Product Fit"
            />
            <input
              type="text"
              value={growthPotential}
              onChange={(e) => setGrowthPotential(e.target.value)}
              className="border p-2 w-full"
              placeholder="Growth Potential"
            />
          </div>

          {/* Proceed to Book Meeting Button */}
          <div className="text-center mt-6">
            <Link to="/book-meeting">
              <button
                disabled={!isFormValid()}
                className={`rounded-full p-2 w-40 sm:w-48 lg:w-60 flex justify-center
                items-center hover:bg-indigo-950 text-white ${
                  isFormValid() ? 'bg-indigo-600' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
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
