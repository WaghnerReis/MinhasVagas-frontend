import React, { createContext, useCallback, useContext } from 'react';

import { JobOpening } from "../interfaces";

import { useApolloClient, useMutation } from "@apollo/client";
import {JOB_OPENINGS, JOB_OPENING, UPDATE_JOB_OPENING, CREATE_JOB_OPENING, DELETE_JOB_OPENING} from '../graphql/jobOpening'

import { useCompany } from './company'

interface JobOpeningContextData {
    jobOpeningsRequest(): Promise<[JobOpening]>
    jobOpeningRequest(id: string): Promise<JobOpening>
    updateJobOpeningRequest(id: string, data: JobOpening): void
    createJobOpeningRequest(data: JobOpening): void
    deleteJobOpeningRequest(data: JobOpening): void
}

const JobOpeningContext = createContext<JobOpeningContextData>({} as JobOpeningContextData)

export const JobOpeningProvider: React.FC = ({children}) => {
  const apolloClient = useApolloClient()  
  const updateJobOpeningRequest = useMutation(UPDATE_JOB_OPENING)
  const createJobOpeningRequest = useMutation(CREATE_JOB_OPENING)
  const deleteJobOpeningRequest = useMutation(DELETE_JOB_OPENING)
  
  const { updateCompanyRequest, createCompanyRequest, deleteCompanyRequest } = useCompany()

  const jobOpenings = useCallback(async () => {
    await apolloClient.resetStore()
    
    const { data } = await apolloClient.query({
      query: JOB_OPENINGS,
    });

    const jobOpenings = data ? data.jobOpenings : null;
    return jobOpenings
  }, [apolloClient])
    
  const jobOpening = useCallback(async (id: string)=>{
    await apolloClient.resetStore()
    
    const { data } = await apolloClient.query({
      query: JOB_OPENING,
      variables: { id }
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

    const [createJobOpeningMutation] = createJobOpeningRequest
    createJobOpeningMutation({variables: {data: formattedData}})
  }, [createCompanyRequest, createJobOpeningRequest])

  const deleteJobOpening = useCallback((data: JobOpening)=> {
    deleteCompanyRequest(data.company._id!)
 
    const [deleteJobOpeningMutation] = deleteJobOpeningRequest
    deleteJobOpeningMutation({variables: {id: data._id}})
   }, [deleteCompanyRequest, deleteJobOpeningRequest])
 
    return (
      <JobOpeningContext.Provider value={{jobOpeningsRequest: jobOpenings, jobOpeningRequest: jobOpening, updateJobOpeningRequest: updateJobOpening, createJobOpeningRequest: createJobOpening, deleteJobOpeningRequest: deleteJobOpening}}>
        {children}
      </JobOpeningContext.Provider>
  )
}

export function useJobOpening(): JobOpeningContextData {
    const context = useContext(JobOpeningContext)
    return context
}
