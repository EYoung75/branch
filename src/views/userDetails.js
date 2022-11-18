import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { rolesMap } from '../usersDef';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_USERS } from '../queries';
import './userDetails.scss';

export default function UserDetails() {
  const location = useLocation();
  const [user, setUser] = useState({ ...location.state.user });

  const UPDATE_USER = gql`
    mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!) {
      updateUser(email: $email, newAttributes: $newAttributes) {
        email
        role
        name
      }
    }
  `;

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {refetchQueries: [{query: ALL_USERS}]});
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div className="container">
      {JSON.stringify(data)}
      <br/>
      {JSON.stringify(location.state.user)}
      <br />
      {JSON.stringify(user)}
      <br />
      {user.name}
      <div className="title">
        <h2>{user.email}</h2>
        <button
          onClick={() => updateUser({ variables: { email: user.email, newAttributes: {name: user.name, role: user.role} } })}
        >
          Save
        </button>
      </div>
      <div className="row details">
        <div className="column">
          <span>Name </span>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          ></input>
        </div>
        <div className="column">
          <p>Role</p>
          {Object.entries(rolesMap).map(([key, val]) => {
            return (
              <div key={key}>
                <input
                  type="radio"
                  onChange={() => setUser({ ...user, role: key })}
                  id={key}
                  value={key}
                  name="role"
                  checked={user.role === key}
                />
                {val}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
