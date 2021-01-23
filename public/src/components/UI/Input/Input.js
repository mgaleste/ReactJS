import React from 'react';

const input = (props) => {
    let inputElement = null;
    
    switch (props.elementType){
        case('input'):
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value}/>
            break;
        case('textarea'):
            inputElement = <teatxarea 
                {...props.elementConfig} 
                value={props.value}/>
            break;
        default:
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value}/>
    }

    return (
    <div>
        <label>{props.label}</label>
        {inputElement}
    </div>
    )
};

export default input;