import React, { createContext, useCallback, useContext } from 'react';

import { JobOpening } from "../interfaces";

import { useApolloClient, useMutation, useSubscription } from "@apollo/client";
import {JOB_OPENINGS, JOB_OPENING, UPDATE_JOB_OPENING, CREATE_JOB_OPENING, DELETE_JOB_OPENING, JOB_OPENING_CREATED, JOB_OPENING_DELETED} from '../graphql/jobOpening'

import { useCompany } from './company'

interface JobOpeningContextData {
    jobOpeningsRequest(): Promise<JobOpening[]>
    jobOpeningRequest(id: string): Promise<JobOpening>
    updateJobOpeningRequest(jobOpeningId: string, companyId: string, data: JobOpening): void
    createJobOpeningRequest(data: JobOpening): void
    deleteJobOpeningRequest(data: JobOpening): void
    jobOpeningCreatedSubscription(): JobOpening
    jobOpeningDeletedSubscription(): string
}

const JobOpeningContext = createContext<JobOpeningContextData>({} as JobOpeningContextData)

export const JobOpeningProvider: React.FC = ({children}) => {
  const apolloClient = useApolloClient()  
  const updateJobOpeningRequest = useMutation(UPDATE_JOB_OPENING)
  const createJobOpeningRequest = useMutation(CREATE_JOB_OPENING)
  const deleteJobOpeningRequest = useMutation(DELETE_JOB_OPENING)
  const jobOpeningCreatedSubscription = useSubscription(JOB_OPENING_CREATED)
  const jobOpeningDeletedSubscription = useSubscription(JOB_OPENING_DELETED)
  
  const { updateCompanyRequest, createCompanyRequest, deleteCompanyRequest } = useCompany()

  const jobOpenings = useCallback(async () => {
    await apolloClient.resetStore()
    
    const { data: { jobOpenings } } = await apolloClient.query({
      query: JOB_OPENINGS,
      fetchPolicy: "no-cache"
    });

    return jobOpenings
  }, [apolloClient])
    
  const jobOpening = useCallback(async (id: string)=>{
    await apolloClient.resetStore()
    
    const { data: { jobOpening } } = await apolloClient.query({
      query: JOB_OPENING,
      variables: { id }, 
      fetchPolicy: 'no-cache'
    });

    return jobOpening
  }, [apolloClient])
    
  const updateJobOpening = useCallback((jobOpeningId: string, companyId: string, data: JobOpening)=> {
    updateCompanyRequest(companyId, data.company)

    const formattedData = {
      ...data,
      company: companyId
    }

    const [updateJobOpeningMutation] = updateJobOpeningRequest
    updateJobOpeningMutation({variables: {id: jobOpeningId, data: formattedData}})
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
 
  const jobOpeningCreated = useCallback(() => {
    const { data } = jobOpeningCreatedSubscription
  
    return data?.jobOpeningCreated
  }, [jobOpeningCreatedSubscription])
 
  const jobOpeningDeleted = useCallback(() => {
    const { data } = jobOpeningDeletedSubscription
  
    return data?.jobOpeningDeleted
  }, [jobOpeningDeletedSubscription])
 
    return (
      <JobOpeningContext.Provider value={{jobOpeningsRequest: jobOpenings, jobOpeningRequest: jobOpening, updateJobOpeningRequest: updateJobOpening, createJobOpeningRequest: createJobOpening, deleteJobOpeningRequest: deleteJobOpening, jobOpeningCreatedSubscription: jobOpeningCreated, jobOpeningDeletedSubscription: jobOpeningDeleted}}>
        {children}
      </JobOpeningContext.Provider>
  )
}

export function useJobOpening(): JobOpeningContextData {
    const context = useContext(JobOpeningContext)
    return context
}
