import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/'


export class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }
    state  = {
        
        purchasing: false,
        
    }

    componentDidMount(){
       // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     }).catch(error=> {
        //         this.setState({error: true});
        //     })
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
       // const ingredients = {...this.state.ingredients}

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

        //this.setState({purchasable: this.props.price > 4})
        return sum > 0;
    };

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount +1;

        // const updatedIngredients ={
        //     ...this.state.ingredients
        // }; 

        // updatedIngredients[type] = updatedCount;

        // const priceAddition = INGREDIENT_PRICES[type] 
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) =>{
        // const oldCount = this.state.ingredients[type];
        // if(oldCount <= 0 ){
        //     return;
        // }
        // const updatedCount = oldCount - 1;

        // const updatedIngredients ={
        //     ...this.state.ingredients
        // }; 

        // updatedIngredients[type] = updatedCount;

        // const priceDeduction = INGREDIENT_PRICES[type] 
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction;
        
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = ()  => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth");
        }
    };
    
    purchaseCancelHandler = ()  => {
        this.setState({purchasing: false});
        
    };

    purchaseContinueHandler = ()  => {
        // this.setState({loading: true});
        // //alert('You Continue!!');
        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Mixerwars',
        //         address: {
        //             street: 'Test Street',
        //             zipCode: '12345',
        //             country: 'Philippines'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json',order)
        //     .then(response =>{
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error =>{
        //         this.setState({loading: false, purchasing: false});
        //     });
        // const queryParams = [];

        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push(encodeURIComponent('price')+'='+encodeURIComponent(this.state.totalPrice));

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push({pathname: '/checkout'});
    };

    
    render (){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        // if(this.state.loading){
        //     orderSummary = <Spinner />;
        // }

        let burger = this.props.error ? <p>Ingredients Cannot Be Loaded</p>: <Spinner />

        if(this.props.ings){
            orderSummary= <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price}/>;

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>  
                );
        }
        
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    };
}

const mapDispacthToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



export default connect(mapStatetoProps, mapDispacthToProps)(withErrorHandler(BurgerBuilder, axios));