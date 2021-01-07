import React, { useEffect, useRef } from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);

  

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
    return () => {
      console.log('[Cockpit.js] useEffect CLEANUP');
    };
  }, []);

  useEffect(() => {
    toggleBtnRef.current.click();
  },[]);

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
            ref={toggleBtnRef}
            className={btnCLass}
            alt={props.showPersons}
            onClick={props.clicked}>
            Toggle Persons
            </button>
        </div>
        );
};

export default React.memo(cockpit);