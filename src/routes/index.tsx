import React from 'react'

import { Switch, Route } from "react-router-dom";

import JobOpenings from "../pages/JobOpenings";
import JobOpeningDetail from "../pages/JobOpeningDetail";
import CreateEditJobOpening from "../pages/CreateEditJobOpening";

export const Routes: React.FC = () =>(
    <Switch>
        <Route path='/' component={JobOpenings} exact/>
        <Route path='/JobOpeningDetail' component={JobOpeningDetail} />
        <Route path='/CreateEditJobOpening' component={CreateEditJobOpening} />
    </Switch>
)

