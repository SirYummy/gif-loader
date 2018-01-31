import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Icon from './webpack-logo.gif'

console.log('Inside main app entry point.  Cool, huh?')

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

class ShouldBeTranspiled extends Component {
    render() {
        return(
        <div>
            <h1>Inside <code>ShouldBeTranspiled</code> React Component</h1>
            <img src={Icon} />
        </div>    
        )
    }
}

ReactDom.render(<ShouldBeTranspiled />, document.getElementById('custom-react-root'))