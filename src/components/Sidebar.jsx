// Sidebar.js

import React from 'react';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-emerald-500 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } md:w-64 md:fixed top-0 w-full`}
    >
      <div className="p-4">
        {/* Sidebar Header */}
        <h1 className="text-2xl font-semibold">Corona Charts</h1>
      </div>
      <ul className="mt-6">
        {/* Sidebar Menu Items */}
        <li className="mb-2">
          <a href="/corona-charts/" className="flex items-center p-3 hover:bg-gray-700">
            Home
          </a>
        </li>
        <h1 className='mb-2 p-2'>CHARTS</h1>
        <hr></hr>
        <li className="mb-2">
          <a href="/corona-charts/pie" className="flex items-center p-3 hover:bg-gray-700">
            Pie
          </a>
        </li>
        <li className="mb-2">
          <a href="/corona-charts/line" className="flex items-center p-3 hover:bg-gray-700">
            Line
          </a>
        </li>
        <li className="mb-2">
          <a href="/corona-charts/bar" className="flex items-center p-3 hover:bg-gray-700">
            Bar
          </a>
        </li>
        <li className="mb-2">
          <a href="/corona-charts/area" className="flex items-center p-3 hover:bg-gray-700">
            Area
          </a>
        </li>
        <li className="mb-2">
          <a href="/corona-charts/pyramid" className="flex items-center p-3 hover:bg-gray-700">
            Pyramid
          </a>
        </li>
        <li className="mb-2">
          <a href="/corona-charts/stacked" className="flex items-center p-3 hover:bg-gray-700">
            Stacked
          </a>
        </li>
        <li className="mb-2">
          <a href="/corona-charts/color-mapping" className="flex items-center p-3 hover:bg-gray-700">
            Color Mapping
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;