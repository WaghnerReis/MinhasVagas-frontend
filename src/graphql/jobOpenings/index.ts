import { gql } from '@apollo/client';

type JobOpening = {
  name: string,
  nivel: string,
  contract: string,
  activitiesAndResponsibilities: string,
  requirements: string,
  remuneration: string,
  company: string
}

export const JOB_OPENINGS = gql`
query {
  jobOpenings{
    _id
    name
    remuneration
    nivel
    contract
    company {
      logo
      name
      address
    }
  }
}
`
export const JOB_OPENING = gql` 
query ($id: ID!) {
  jobOpening(id: $id) {
    _id
    name
    remuneration
    nivel
    contract
    activitiesAndResponsibilities
    requirements
    
    company {
      name
      address
      logo
      description
      whatWeOffer
    }
  }
}
`
export const UPDATE_JOB_OPENING = gql` 
mutation ($id: ID!, $data: JobOpening!){
  updateJobOpening(id: $id, data:$data)
  {
    name
    company{
      name
    }
  }
} 
`