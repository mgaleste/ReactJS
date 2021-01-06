import React from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
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
            <h1>Hi, I am React File</h1>
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