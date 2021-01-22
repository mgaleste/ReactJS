import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';

import classes from './ContactData.css';


class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        this.setState({loading: true});
        event.preventDefault();
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mixerwars',
                address: {
                    street: 'Test Street',
                    zipCode: '12345',
                    country: 'Philippines'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json',order)
            .then(response =>{
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error =>{
                this.setState({loading: false});
            });
    }

    render () {
        let form =(
            <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email"/>
                    <input type="text" name="street" placeholder="Your Street"/>
                    <input type="text" name="postal" placeholder="Your Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>Order Here</Button>
                </form>
        );
        if( this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;