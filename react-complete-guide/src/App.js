import React, { Component } from 'react';
//import Radium, { StyleRoot } from 'radium';
//import styled from 'styled-components';
import './App.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'uno', name: 'Max', age: 28},
      {id: 'dalawa', name: 'Manu', age: 29},
      {id: 'drei', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inderit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <Person 
            click={()=>this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
          
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover']= {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const classes = [];

    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

     return (
       
        <div className="App">
          <h1>Hi, I am React File</h1>
          <p className={classes.join(' ')}>Hi There also</p>
          <button 
            className="button"
            alt={this.state.showPersons}
            onClick={this.togglePersonsHandler}>
            Switch Name
          </button>
          
            {persons}
        </div>
       
     );
    //return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'I am an react Element'));
  }
}

//export default Radium(App);
export default App;