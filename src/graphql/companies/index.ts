import { gql } from '@apollo/client';

export const JOB_OPENINGS = gql`
query jobOpenings {
  _id
    name
    company {
      name
    }
}
`