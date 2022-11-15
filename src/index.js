import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import UsersList from './components/usersList';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <pre>
      <code>
      {/* <Routes>
        <Route path="/" render={(props) => props.allUsers ? <UsersList users={props.allUsers} /> : <p>No users were fetched</p>}/>
      </Routes> */}
        {data.allUsers.length ? <UsersList users={data.allUsers}/> : <p>No users were fetched</p>}
      </code>
    </pre>
  )
}

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));