import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USERS, ALL_USERS, RESET_USERS } from '../gql.js';
import UserRow from '../components/userRow.js';
import './usersList.scss';

export default function UsersList(props) {
  const { users } = props;
  // Local state for tracking selected users
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [deleteUsers, { loading: deleteUsersLoading, error }] = useMutation(DELETE_USERS, {
    refetchQueries: [{ query: ALL_USERS }],
  });
  // Temp mutation for resetting users data
  const [resetUsers, { loading: resetUsersLoading }] = useMutation(RESET_USERS, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  /**
   * Accepts a user object as a parameter. If the user already exists in the selectedUsers array, remove it.
   * Otherwise add it to the selectedUsers array
   * @param {Object} user
   */
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

  // Handle both loading states from deleteUsers and resetUsers mutations
  if (deleteUsersLoading || resetUsersLoading) {
    return <p>{deleteUsersLoading ? 'Deleting' : 'Resetting'} Users...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div className='usersList'>
      <div className='title row'>
        <h1>Users</h1>
        <button
          disabled={!selectedUsers.length}
          onClick={() => {
            // Map the selectedUsers array to return an array of emails expected by the DeleteUsers mutation
            deleteUsers({
              variables: { emails: selectedUsers.map((user) => user.email) },
            });
            // Reset the local selectedUsers array
            setSelectedUsers([]);
          }}
        >
          Delete
        </button>
      </div>
      <div className='row heading'>
        {['Email', 'Name', 'Role'].map((heading, index) => (
          <h3 key={`heading-${index}`} className='column'>
            {heading}
          </h3>
        ))}
      </div>
      {users.map((user, index) => {
        return <UserRow key={index} user={user} handleUser={handleUser} />;
      })}
      <button
        className='reset'
        onClick={() => resetUsers()}
        style={{
          marginLeft: '50px',
          marginTop: '25px',
          border: 'solid green 2px',
          backgroundColor: 'white',
          color: 'green',
          borderRadius: '3px',
        }}
      >
        Reset
      </button>
    </div>
  );
}
