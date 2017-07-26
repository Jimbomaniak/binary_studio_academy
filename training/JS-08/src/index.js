import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import App from './containers/app'
import ManageUsers from './components/manageUsers'

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="users" component={ManageUsers}/>
            </Route>
        </Router>
    )
    , document.getElementById('root')
);
