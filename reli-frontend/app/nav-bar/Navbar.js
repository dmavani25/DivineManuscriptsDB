import React from 'react';

const Navbar = () => {
  return (
    <nav className="z-50 shadow-md fixed top-0 w-full">
      <div className="p-0.5 bg-primary"></div>
      <div className="p-3 flex justify-between items-center">
        <div className="text-xl text-primary font-bold">
          Divine Manuscripts Db
        </div>

        <div className="p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Notifications icon */}
            {/* Profile icon */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
