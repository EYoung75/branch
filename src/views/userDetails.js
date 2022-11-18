import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { rolesMap } from '../usersDef';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ALL_USERS, GET_USER, UPDATE_USER} from '../gql';
import './userDetails.scss';

export default function UserDetails() {
  const location = useLocation();
  const [user, setUser] = useState({ ...location.state.user });

  

const {data: getUserData, error: getUserError, loading: getUserLoading} = useQuery(GET_USER, {
  variables: {email: location.state.user.email}
});


  const [updateUser, {loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER, {refetchQueries: [{query: ALL_USERS}]});
  if (updateUserLoading || getUserLoading) {
    return <p>Loading...</p>;
  }
  console.log(getUserData);
  if (updateUserError) {
    return <p>Error: {JSON.stringify(updateUserError)}</p>;
  }
  if(getUserError) {
    return <p>Error: {JSON.stringify(getUserError)}</p>;
  }

  return (
    <div className="container">
      <br/>
      {JSON.stringify(getUserData)}
      <br />
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
