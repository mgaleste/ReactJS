import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition'

import './Modal.css';

const animationTiming = {
    enter: 1000,
    exit: 1500
}

const modal = (props) => {
    const cssClasses = ['Modal'];
    
    return (
        <CSSTransition
        in={props.show} 
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
           enter: '',
           enterActive: 'ModalOpen',
           exit: '',
           exitActive: 'ModalClose'
           
        }} 
        >    

    <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>Dismiss</button>
    </div>

    </CSSTransition>
    );
};

export default modal;