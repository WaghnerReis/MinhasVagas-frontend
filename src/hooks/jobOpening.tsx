import React, { createContext, useCallback, useContext } from 'react';

import { JobOpening } from "../interfaces";

import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import {JOB_OPENINGS, JOB_OPENING, UPDATE_JOB_OPENING, CREATE_JOB_OPENING} from '../graphql/jobOpening'

import { useCompany } from './company'

interface JobOpeningContextData {
    jobOpeningsRequest(): [JobOpening]
    jobOpeningRequest(id: string): Promise<JobOpening>
    updateJobOpeningRequest(id: string, data: JobOpening): void
    createJobOpeningRequest(data: JobOpening): void
}

const JobOpeningContext = createContext<JobOpeningContextData>({} as JobOpeningContextData)

export const JobOpeningProvider: React.FC = ({children}) => {
  const jobOpeningsRequest = useQuery(JOB_OPENINGS)  
  const apolloClient = useApolloClient()  
  const updateJobOpeningRequest = useMutation(UPDATE_JOB_OPENING)
  const createJobOpeningRequest = useMutation(CREATE_JOB_OPENING)
  
  const { updateCompanyRequest, createCompanyRequest } = useCompany()

  const jobOpenings = useCallback(()=>{
    const { loading, data } = jobOpeningsRequest
  
    const jobOpenings = loading ? null : data.jobOpenings;
    return jobOpenings
  }, [jobOpeningsRequest])
    
  const jobOpening = useCallback(async (id: string)=>{
    const { data } = await apolloClient.query({
      query: JOB_OPENING,
      variables: { id },
      fetchPolicy: "network-only"
    });

    const jobOpening = data ? data.jobOpening : null;
    return jobOpening
  }, [apolloClient])
    
  const updateJobOpening = useCallback((id: string, data: JobOpening)=> {
    const companyId = data.company._id
    delete data.company._id

    updateCompanyRequest(companyId!, data.company)

    const formattedData = {
      ...data,
      company: companyId
    }

    const [updateJobOpeningMutation] = updateJobOpeningRequest
    updateJobOpeningMutation({variables: {id, data: formattedData}})
  }, [updateCompanyRequest, updateJobOpeningRequest])
  
  const createJobOpening = useCallback(async (data: JobOpening)=> {
   const companyId = await createCompanyRequest(data.company)

    const formattedData = {
      ...data,
      company: companyId
    }

    console.log(formattedData)

    const [createJobOpeningMutation] = createJobOpeningRequest
    createJobOpeningMutation({variables: {data: formattedData}})
  }, [createCompanyRequest, createJobOpeningRequest])

    return (
      <JobOpeningContext.Provider value={{jobOpeningsRequest: jobOpenings, jobOpeningRequest: jobOpening, updateJobOpeningRequest: updateJobOpening, createJobOpeningRequest: createJobOpening}}>
        {children}
      </JobOpeningContext.Provider>
  )
}

export function useJobOpening(): JobOpeningContextData {
    const context = useContext(JobOpeningContext)
    return context
}
