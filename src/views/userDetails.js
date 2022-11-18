import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { rolesMap } from '../usersDef';
import { useMutation } from '@apollo/react-hooks';
import { ALL_USERS, UPDATE_USER } from '../gql';
import './userDetails.scss';

export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  // Create local user object whose initial value is a shallow copy of user prop
  const [user, setUser] = useState({ ...location.state.user });

  // Ideal To-Do: replace user prop with GET_USER query and handle local caching
  // const {
  //   data: getUserData,
  //   loading: getUserLoading,
  //   error: getUserError,
  // } = useQuery(GET_USER, {
  //   variables: { email: location.state.user.email },
  // });

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] = useMutation(
    UPDATE_USER,
    { refetchQueries: [{ query: ALL_USERS }], onCompleted: () => navigate('/') }
  );

  // Handle loading states for both getUser query and updateUser mutation
  if (updateUserLoading) {
    return <p>Loading...</p>;
  }
  if (updateUserError) {
    return <p>Error: {JSON.stringify(updateUserError)}</p>;
  }

  return (
    <div className='container'>
      <div className='title'>
        <h2>{user.email}</h2>
        <button
          onClick={() =>
            updateUser({
              variables: { email: user.email, newAttributes: { name: user.name, role: user.role } },
            })
          }
        >
          Save
        </button>
      </div>
      <div className='row details'>
        <div className='column'>
          <span>Name </span>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          ></input>
        </div>
        <div className='column'>
          <p>Role</p>
          {Object.entries(rolesMap).map(([key, val]) => {
            return (
              <div key={key}>
                <input
                  type='radio'
                  onChange={() => setUser({ ...user, role: key })}
                  id={key}
                  value={key}
                  name='role'
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
