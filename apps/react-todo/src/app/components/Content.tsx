import React from 'react';
import { useQuery, gql } from '@apollo/client';

const RECIPE_QUERY = gql`
  query {
    recipes {
      title
      description
    }
  }
`;

const Content: React.FC = () => {
  // TODO: share types by GraphQL-CodeGen
  const { loading, error, data } = useQuery(RECIPE_QUERY);

  return (
    <>
      <h1>Check Apollo Client Status</h1>
      <p>Content</p>
      {loading ? <p>Loading</p> : null}
      {error ? <p>Error!</p> : null}
      {data ? <p>{JSON.stringify(data)}</p> : null}
    </>
  );
};

export default Content;
