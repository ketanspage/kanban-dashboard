import React, { useState, useEffect, useRef } from 'react';
import display from '../assets/icons_FEtask/Display.svg';
import down from '../assets/icons_FEtask/down.svg';

const GroupSelector = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='navbar'>
      <div className="group-selector" ref={dropdownRef}>
        <button className="display-button" onClick={toggleDropdown}>
          <img src={display} alt="display-icon" />
          Display
          <img src={down} alt="dropdown-icon" />
        </button>
        {isOpen && (
          <div className="dropdown">
            <div className="dropdown-item">
              <label>Grouping</label>
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label>Ordering</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSelector;
