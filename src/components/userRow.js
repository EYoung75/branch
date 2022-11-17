import React from 'react';
import { Link } from 'react-router-dom';
import './userRow.scss';

export default function UserRow(props) {
  const {user} = props;
  const {handleUser} = props;
  return (
    <Link to='/user' className='userRow' state={{ user: user }}>
      <input type='checkbox' onClick={(e) => e.stopPropagation()} onChange={(e) => handleUser(user)}/>
      <span>{user.email}</span>
      <span>{user.name}</span>
      <span>{user.role.replace('_', ' ').toUpperCase()}</span>
    </Link>
  );
}
