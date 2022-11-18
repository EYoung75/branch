import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import UsersList from './views/usersList.js';
import UserDetails from './views/userDetails.js';
import { useMutation } from '@apollo/react-hooks';
import { ALL_USERS } from './queries';


const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      },
    });
  },
});



const RESET_USERS = gql`
  mutation ResetUsers {
    resetUsers
  }
`;

const App = () => {
  const {data: usersQueryData, error: allUsersError, loading: allUsersLoading} = useQuery(ALL_USERS);
  const [resetUsers, {data: resetData, loading: resetLoading}] = useMutation(RESET_USERS, {
    refetchQueries: [{query: ALL_USERS}]
  });

  if (allUsersLoading || resetLoading) {
    return <p>Loading...</p>;
  }

  if (allUsersError) {
    return <p>Error Fetching Users: {JSON.stringify(allUsersError)}</p>;
  }
  console.log(resetData)

  return (
    <pre>
      <code>
        <Routes>
          <Route path="/" element={usersQueryData.allUsers.length ? <UsersList users={usersQueryData.allUsers} /> : <div>No Users Found</div>} />
          <Route path="/user" element={<UserDetails />} />
        </Routes>
        <button
          onClick={() => resetUsers()}
        >
          Reset
        </button>
      </code> 
    </pre>
  );
};

const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
