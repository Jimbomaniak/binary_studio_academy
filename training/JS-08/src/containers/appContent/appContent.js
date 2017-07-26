import React, { Component } from 'react'
import './appContent.css'

class AppContent extends Component {
    render() {
        return (
            <div className='app__content'>{this.props.children}</div>
        )
    }
}

export default AppContent