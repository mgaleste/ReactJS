import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect } from 'react-router-dom';
import { updateObject,checkValidity } from '../../shared/utility'


class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        }; 
        this.setState({controls: updatedControls}); 
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandle = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    render(){
        const formElementArray =[];
        for (let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
         
        
        let form = formElementArray.map(formElement => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            />
        ));

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let authRedirect = null; 
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return(
            <div>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandle}
                    >SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Auth);