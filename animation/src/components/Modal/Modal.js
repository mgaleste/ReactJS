import React from 'react';
import Transition from 'react-transition-group/Transition'

import './Modal.css';

const modal = (props) => {
    const cssClasses = ['Modal'];
    
    return (
        <Transition
        in={props.show} 
        imeout={300}
        mountOnEnter
        unmountOnExit
        >    
    {state => {
        const cssClasses = ['Modal',
    state==='entering' ? 'ModalOpen' :
    state==='exiting' ? 'ModalClose' : null];
        return (
    <div className={cssClasses.join(' ')}>
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>Dismiss</button>
    </div>
    )}
    }
    </Transition>
    );
};

export default modal;