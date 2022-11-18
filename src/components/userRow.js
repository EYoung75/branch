import React from 'react';
import { Link } from 'react-router-dom';
import './userRow.scss';
import { rolesMap } from '../usersDef';

export default function UserRow(props) {
  const {user} = props;
  // The handleUser callback function is called anytime the checkbox on a user row is clicked
  const {handleUser} = props;
 
  return (
    <Link to='/user' className='userRow' state={{ user: user }}>
      <input type='checkbox' onClick={(e) => e.stopPropagation()} onChange={() => handleUser(user)}/>
      <span>{user.email}</span>
      <span>{user.name}</span>
      <span>{rolesMap[user.role]}</span>
    </Link>
  );
}
