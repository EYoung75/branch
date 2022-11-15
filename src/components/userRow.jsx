import React from 'react';

function UserRow(props) {
  return (
    <div className="userRow">
        <input type="checkbox"/>
        <span>{props.user.email}</span>
        <span>{props.user.name}</span>
        <span>{props.user.role}</span>
    </div>
  );
}

export default UserRow;