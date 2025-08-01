import React, { useState, useRef, useEffect } from 'react';
import './UserAvatar.css';

function UserAvatar({ username, role, onLogout, onUserManagement, onAccount, onSettings }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const initial = (username || '').charAt(0).toUpperCase();

  return (
    <div className="user-avatar-container" ref={containerRef}>
      <div className="user-avatar" onClick={() => setOpen(!open)}>
        {initial || '?'}
      </div>
      {open && (
        <div className="avatar-menu">
          <button type="button" onClick={() => { onAccount(); setOpen(false); }}>Account</button>
          <button type="button" onClick={() => { onSettings(); setOpen(false); }}>Settings</button>
          {role === 'admin' && (
            <button type="button" onClick={() => { onUserManagement(); setOpen(false); }}>
              User Management
            </button>
          )}
          <div className="menu-divider" />
          <button type="button" className="logout" onClick={onLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
