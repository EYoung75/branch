import React, { useState } from 'react';
import UserRow from '../components/userRow.js';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './usersList.scss';

export default function UsersList(props) {
  const { users } = props;
  // Local state for tracking all selected users
  const [selectedUsers, setSelectedUsers] = useState([]);

  const DELETE_USERS = gql`
    mutation DeleteUsers($emails: [ID]!) {
      deleteUsers(emails: $emails)
    }
  `;

  const [deleteUsers, { data, loading, error }] = useMutation(DELETE_USERS);

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
  };

  if (loading) {
    return <p>Deleting Users...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div className="usersList">
      {JSON.stringify(data)}
      <div className="title row">
        <h1>Users</h1>
        <button
          disabled={!selectedUsers.length}
          onClick={() =>
            deleteUsers({
              variables: { emails: selectedUsers.map((user) => user.email)},
            })
          }
        >
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
