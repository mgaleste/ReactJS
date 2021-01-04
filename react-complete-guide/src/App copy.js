import React, { useState } from 'react';

import './App.css';
import Person from './Person/Person';

const app = props => {
  const [ personsState, setPersonsState] = useState({
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value'
  });
  
  const [otherState, setOtherState] = useState('some other value');

  const switchNameHandler = () => {
    //console.log('was clicked');
    //Do Not Do This : personsState.persons[0].name = 'Maximillian';
    setPersonsState({persons: [
      {name: 'Maximillian', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 27}
      ]
      //,otherState: personsState.otherState 
    });
  };

     return (
       <div className="App">
         <h1>Hi, I am React File</h1>
         <p>Hi There also</p>
         <button onClick={switchNameHandler}>Switch Name</button>
         <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
         <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
         <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
       </div>
     );
    //return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'I am an react Element'));

}

export default app;

