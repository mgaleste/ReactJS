import React, { useEffect } from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
  });

    const assignedClasses = [];
    let btnCLass = '';

    if(props.showPersons){
        btnCLass = classes.Red;
    }
    

    if(props.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    
    if(props.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>Hi There also</p>
            <button 
            className={btnCLass}
            alt={props.showPersons}
            onClick={props.clicked}>
            Switch Name
            </button>
        </div>
        );
};

export default cockpit;