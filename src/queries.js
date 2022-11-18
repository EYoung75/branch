import { gql } from "apollo-boost";

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
  query {
    authors {
      id
      name
      bio
      picture
      books {
        id
        title
        summary
        bookCover
      }
    }
  }
`;
export { ALL_USERS };