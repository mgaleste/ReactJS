import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/ChecoutSummary';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';

class Checkout extends Component{

    componentDidMount(){
    //    this.props.onInitPurchase();
    }

    componentWillMount(){
    //    this.props.onInitPurchase();
//         const  query = new URLSearchParams(this.props.location.search);
//         const ingredients = {};
//         let price = 0;
//         for(let param of query.entries()){
//             if(param[0] === 'price'){
//                 price = param[1]
// ;            }else{
//                 ingredients[param[0]] = +param[1];
//             }
            
//         }
//         this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render(){
        let summary = <Redirect to="/" />
        
        if(this.props.ings){
            const purchasedRedirect= this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
            <div>
            {purchasedRedirect}
            <CheckoutSummary 
                ingredients={this.props.ings}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                onCheckoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData} 
                //render={(props)=>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}
                />
            </div> 
                );
        }
        return summary;
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    };
}



export default connect(mapStatetoProps)(Checkout);