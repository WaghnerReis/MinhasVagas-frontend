import React from 'react'

import { Switch, Route } from "react-router-dom";

import JobOpenings from "../pages/JobOpenings";
import JobOpeningDetail from "../pages/JobOpeningDetail";

export const Routes: React.FC = () =>(
    <Switch>
        <Route path='/' component={JobOpenings} exact/>
        <Route path='/JobOpeningDetail' component={JobOpeningDetail} />
    </Switch>
)

