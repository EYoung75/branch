import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import UsersList from './views/usersList.js';
import UserDetails from './views/userDetails.js';
import { ALL_USERS } from './gql';

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

const App = () => {
  const { data, error, loading } = useQuery(ALL_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Fetching Users: {JSON.stringify(error)}</p>;
  }

  return (
    <pre>
      <code>
        <Routes>
          <Route
            path='/'
            element={
              data.allUsers.length ? <UsersList users={data.allUsers} /> : <div>No Users Found</div>
            }
          />
          <Route path='/user' element={<UserDetails />} />
        </Routes>
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
