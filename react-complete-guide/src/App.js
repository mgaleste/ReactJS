import React, { Component } from 'react';

import './App.css';

import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
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

  nameChangedHandler = (event) => {
    //console.log('was clicked');
    //Do Not Do This : this.state.persons[0].name = 'Maximillian';
    this.setState({persons: [
      {name: 'Max', age: 28},
      {name: event.target.value, age: 29},
      {name: 'Stephanie', age: 26}
      ] 
    })
  }

  togglePersonsHandler = () =>{
    const doesShow = this.state.showPersons;
    console.log(doesShow);
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inderit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div >
          <Person 
              name={this.state.persons[0].name} 
              age={this.state.persons[0].age}/>
          <Person 
              name={this.state.persons[1].name} 
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, 'Max!')}
              changed={this.nameChangedHandler}  
                >My Hobbies: Racing
          </Person>
          <Person 
              name={this.state.persons[2].name} 
              age={this.state.persons[2].age}/>
        </div>
      );
    }

     return (
       <div className="App">
         <h1>Hi, I am React File</h1>
         <p>Hi There also</p>
         <button
            style={style} 
            onClick={this.togglePersonsHandler}>Switch Name</button>
           {persons}
       </div>
     );
    //return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'I am an react Element'));
  }
}

export default App;
