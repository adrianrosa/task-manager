import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home/Home';
import ProjectContainer from './components/projectContainer';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/projects">
                    <ProjectContainer />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
