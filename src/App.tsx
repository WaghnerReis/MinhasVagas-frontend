import React from 'react';

import { ApolloProvider } from '@apollo/client';
import api from './services/api'

import { Routes } from "./routes";
import {BrowserRouter} from 'react-router-dom'

import GlobalStyle from './styles/globals'

const App: React.FC = () => (
  <ApolloProvider client={api}>
    <BrowserRouter>
    <Routes/>
  <GlobalStyle/>
  </BrowserRouter>
  </ApolloProvider>
  )




  

export default App;
