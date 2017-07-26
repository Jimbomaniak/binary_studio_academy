import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './app.css'

class App extends Component {
    render() {
        console.log(this.props.children);
        return (
            <div id="app">
                <h3 className="app__header">Welcome to React mf!</h3>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element
};

export default App
