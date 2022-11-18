import { gql } from 'apollo-boost';

const ALL_USERS = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const GET_USER = gql`
  query GetUser($email: ID!) {
    user(email: $email) {
      email
      name
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
      role
      name
    }
  }
`;

const DELETE_USERS = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

const RESET_USERS = gql`
  mutation ResetUsers {
    resetUsers
  }
`;

export { ALL_USERS, GET_USER, UPDATE_USER, DELETE_USERS, RESET_USERS };
