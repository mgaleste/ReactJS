import React, { Component } from 'react';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/'

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render () {
        return (
            <div>
                {this.props.orders.map(order=>
                <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                />)}
            </div>
        );
    }

}

const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}


const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(Orders,axios));