import React from 'react';
import { useLocation } from 'react-router-dom';
import './userDetails.scss';

export default function UserDetails() {
  const location = useLocation();
  const { user } = location.state;
  return (
    <div className="userDetails">
      <div className="title">
        <h2>{user.email}</h2>
        <button>Save</button>
      </div>
      <div className="row details">
        <div className="column">
          <span>Name </span>
          <input value={user.name}></input>
        </div>
        <div className="column">
          <p>Role</p>
          {['ADMIN', 'Developer', 'App Manager', 'Marketing', 'Sales'].map((role, index) => (
            <div key={`radio-${index}`}>
              <input
                key={index}
                type="radio"
                checked={user.role === role}
                onChange={() => {}}
                value={role}
                name="role"
x              />
              {role}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
