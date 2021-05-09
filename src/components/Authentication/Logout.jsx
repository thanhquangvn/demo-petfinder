import React from 'react';
import './Logout.css'

export default function Logout({ setToken }) {
  function handleLogout() {
    setToken(null);
  }
  return (
    <div className="container">
      <button className='button button1' onClick={handleLogout} type='button'>
        Log Out
      </button>
    </div>
  );
}
