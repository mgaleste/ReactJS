import React, { Component } from 'react';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/'

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders();
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
        loading: state.order.loading
    }
}


const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(Orders,axios));