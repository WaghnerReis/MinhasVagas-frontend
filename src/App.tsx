import React from 'react';

import AppProvider from "./hooks";

import { ApolloProvider } from '@apollo/client';
import api from './services/api'

import { Routes } from "./routes";
import {BrowserRouter} from 'react-router-dom'

import GlobalStyle from './styles/globals'

const App: React.FC = () => (
  <ApolloProvider client={api}>
      <BrowserRouter>
        <AppProvider>
          <Routes/>
        </AppProvider>
      <GlobalStyle/>
    </BrowserRouter>
  </ApolloProvider>
  )




  

export default App;
