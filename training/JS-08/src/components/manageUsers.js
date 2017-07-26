import React, { Component } from 'react';
import AppContent from '../containers/appContent/appContent'
import AddUser from './addUser/addUser'
import './manageUsers.css'

class ManageUsers extends Component {
    render() {
        return (
            <AppContent>
                <AddUser/>
            </AppContent>
        )
    }
}

export default ManageUsers