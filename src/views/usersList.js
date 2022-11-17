import React, { useState } from 'react';
import './usersList.scss';
import UserRow from '../components/userRow.js';

export default function UsersList(props) {
  const { users } = props;
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Accepts a user object as a parameter and if the user exists removes it from the selectedUsers array, otherwise appends the user to the array
  const handleUser = (user) => {
    const existingIndex = selectedUsers.findIndex((i) => i.email === user.email);
    if (existingIndex >= 0) {
      setSelectedUsers([
        ...selectedUsers.slice(0, existingIndex),
        ...selectedUsers.slice(existingIndex + 1, selectedUsers.length),
      ]);
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  }

  // Handles the mutation call for removing any selected users
  const deleteUsers = () => {
    if (!selectedUsers.length) return;
    console.log('DELETING', selectedUsers);
  };

  return (
    <div className="usersList">
      <div className="title row">
        <h1>Users</h1>
        <button disabled={!selectedUsers.length} onClick={() => deleteUsers()}>
          Delete
        </button>
      </div>
      <div className="row heading">
        {['Email', 'Name', 'Role'].map((heading, index) => (
          <h3 key={`heading-${index}`} className="column">
            {heading}
          </h3>
        ))}
      </div>
      {users.map((user, index) => {
        return <UserRow key={index} user={user} handleUser={handleUser} />;
      })}
    </div>
  );
}
