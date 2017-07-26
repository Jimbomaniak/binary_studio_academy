import React, { Component } from 'react';
import './addUser.css'

class AddUser extends Component {
    render() {
        return (
            <div className="content__add-user">
                <input type="text" maxLength={15}/>
                <input type="button" value="Add"/>
            </div>
        )
    }
}

export default AddUser