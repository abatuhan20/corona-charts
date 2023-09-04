import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
//  CHART IMPORTS
import Pie from "./components/Charts/Pie"
import Line from "./components/Charts/Line"
import Bar from "./components/Charts/Bar"
import Area from './components/Charts/Area';
import Pyramid from './components/Charts/Pyramid';
import StackedBar from './components/Charts/Stacked';
import ColorMapping from "./components/Charts/ColorMapping"

// NORMAL COMPONENT IMPORTS
import Home from './components/Home';
import Sidebar from "./components/Sidebar"
import CovidData from './components/CovidData';
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BrowserRouter>
      <div className="relative">
        {/* Menu Button */}
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 text-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-64' : 'translate-x-0'
          }`}
        >
          {isOpen ? <FaTimes className='text-white ml-20 md:text-black' /> : <FaBars/>}
        </button>

         {/* Main Content */}
         <div
          className={`relative h-screen ml-0 md:ml-64 md:h-full transition-transform duration-300 ease-in-out${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="p-12 flex justify-center items-center overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pie" element={<Pie/>} />
              <Route path="/line" element={<Line />} />
              <Route path="/bar" element={<Bar/>} />
              <Route path="/area" element={<Area/>} />
              <Route path="/pyramid" element={<Pyramid/>} />
              <Route path="/stacked" element={<StackedBar/>} />
              <Route path="/color-mapping" element={<ColorMapping/>} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </BrowserRouter>
  );
}

export default App
