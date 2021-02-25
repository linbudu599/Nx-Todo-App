import React from 'react';
import { useQuery, gql } from '@apollo/client';

// import type { Query, Recipe } from '@todoapp/graphql';

// const RECIPE_QUERY = gql`
//   query {
//     recipes {
//       title
//       description
//     }
//   }
// `;

const Content: React.FC = () => {
  // const { loading, error, data } = useQuery<Query>(RECIPE_QUERY);

  return (
    <>
      <h1>Check Apollo Client Status</h1>
      <p>Content</p>
      {/* {loading ? <p>Loading</p> : null}
      {error ? <p>Error!</p> : null}
      {data
        ? data.recipes.map((recipe) => (
            <div key={recipe.title}>
              <p>title: {recipe.title}</p>
              <p>description: {recipe.description}</p>
            </div>
          ))
        : null} */}
    </>
  );
};

export default Content;
