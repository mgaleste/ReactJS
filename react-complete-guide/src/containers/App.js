import React, { Component } from 'react';
//import Radium, { StyleRoot } from 'radium';
//import styled from 'styled-components';
import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
    
  }

  state = {
    persons: [
      {id: 'uno', name: 'Max', age: 28},
      {id: 'dalawa', name: 'Manu', age: 29},
      {id: 'drei', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    //console.log('was clicked');
    //Do Not Do This : this.state.persons[0].name = 'Maximillian';
    this.setState({persons: [
      {name: newName, age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 27}
    ] 
    })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons})
  }

  nameChangedHandler = (event, id) => {
    //console.log('was clicked');
    //Do Not Do This : this.state.persons[0].name = 'Maximillian';
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({persons: persons })
  }

  togglePersonsHandler = () =>{
    const doesShow = this.state.showPersons;
    console.log(doesShow);
    this.setState({showPersons: !doesShow});
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    let btnCLass = [classes.button];

    if(this.state.showPersons){
      persons = (
        
          <Persons 
          persons={this.state.persons} 
          clicked={this.deletePersonHandler} 
          changed={this.nameChangedHandler}/>
        
      );

      btnCLass.push(classes.Red);
      
    }

    

     return (
       
        <div className={classes.App}>
          <button 
          onClick={() => {
            this.setState({ showCockpit: false});
          }}>
            Remove Cockpit</button>
          { this.state.showCockpit ? <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          /> : null
          }
          {persons}
  
        </div>
       
     );
    //return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'I am an react Element'));
  }
}

//export default Radium(App);
export default App;