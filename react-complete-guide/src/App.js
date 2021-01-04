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
    otherState: 'some other value'
  };

  switchNameHandler = (newName) => {
    //console.log('was clicked');
    //Do Not Do This : this.state.persons[0].name = 'Maximillian';
    this.setState({persons: [
      {name: newName, age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 27}
    ] 
    });
  }

  nameChangedHandler = (event) => {
    //console.log('was clicked');
    //Do Not Do This : this.state.persons[0].name = 'Maximillian';
    this.setState({persons: [
      {name: 'Max', age: 28},
      {name: event.target.value, age: 29},
      {name: 'Stephanie', age: 26}
      ] 
    });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inderit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

     return (
       <div className="App">
         <h1>Hi, I am React File</h1>
         <p>Hi There also</p>
         <button
            style={style} 
            onClick={()=>this.switchNameHandler('Maximillian!!')}>
              Switch Name
          </button>
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
    //return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'I am an react Element'));
  }
}

export default App;
