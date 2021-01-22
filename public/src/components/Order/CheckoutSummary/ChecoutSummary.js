import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSmmary}>
            <h1>Tasty</h1>
            <div styel={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
               btnType="Danger"
               clicked={props.onCheckoutCancelled}
               >Cancel</Button>
            <Button 
               btnType="Success"
               clicked={props.onCheckoutContinued}
               >Continue</Button>
        </div>
    );
}

export default checkoutSummary;