import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

//import Radium from 'radium';
//import styled from 'styled-components';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

import classes from './Person.css';

class Person extends Component {
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount(){
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log('Context Authenticated',this.context.authenticated);
    }

    render(){ 
    console.log('[Person.js] rendering..'); 
    return (
        <Aux>
            <AuthContext.Consumer>
                {(context) => 
                    context.authenticated ? <p>Authenticated</p> : <p>Please Login</p>
                }
            </AuthContext.Consumer>
            <p key="i1" onClick={this.props.click}>
                I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p key="i2">{this.props.children}</p>
            <input 
                key="i3"
                //ref={(inputEl)=> {this.inputElement = inputEl}}
                ref={this.inputElementRef}
                type="text" 
                onChange={this.props.changed} 
                value={this.props.name}/>
        </Aux>
        
    );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};


//export default Radium(person);
export default withClass(Person, classes.Person);