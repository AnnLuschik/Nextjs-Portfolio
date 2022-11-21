import { gql } from '@apollo/client';

export const CORE_POST_FIELDS = gql`
  fragment CorePostFields on Post {
    _id
    content
    slug
  }
`;
