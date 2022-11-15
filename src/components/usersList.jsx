import React from 'react';
import '../styles.scss';
import UserRow from './userRow';

function UsersList(props) {
  return (
    <div className="usersContainer">
        <div className='heading'>
            <h1>Users</h1>
            <button>Delete</button>
        </div>
        <div className="rowTitles row">
            {/* {['Email', 'Name', 'Role'].map((title) => <h3>{title}</h3>)} */}
            <h3>Email</h3>
            <h3>Name</h3>
            <h3>Role</h3>
        </div>
        {props.users.map((user, index) => {
            return <UserRow key={index} user={user}/>
        })}
    </div>
  );
}


export default UsersList;