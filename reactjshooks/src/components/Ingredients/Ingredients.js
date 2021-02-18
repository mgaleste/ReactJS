import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('reached the DEFAULT');   
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const {
    isLoading, 
    error, 
    data, 
    reqExtra, 
    reqIdentifier, 
    clear, 
    sendRequest} = useHttp();
  {/*useEffect(() => {
    fetch('https://react-hooks-update-d6edf-default-rtdb.firebaseio.com/ingredients.json')
    .then(response => response.json())
    .then(responseData =>{
      const loadedIngredients = [];
      for (const key in responseData){
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
        });
      }
      setUserIngredients(loadedIngredients);
    });
  },[]);*/}

  useEffect(() =>{
    if(!isLoading && reqIdentifier==='REMOVE_INGREDIENT'){
      dispatch({type: 'DELETE', id: reqExtra});
    }else if(!isLoading && !error && reqIdentifier==='ADD_INGREDIENT'){
      dispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra}});
    }
  },[data, reqExtra, reqIdentifier, isLoading, error]);
  

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
   dispatch({type: 'SET', ingredients: filteredIngredients});
  },[]);

  const addIngredientHandler = useCallback(ingredient => {
    
    sendRequest(
      `https://react-hooks-update-d6edf-default-rtdb.firebaseio.com/ingredients.json`,
       'POST',
       JSON.stringify(ingredient),
       ingredient,
       'ADD_INGREDIENT'
      );
    
  },[sendRequest]);

  const removeIngredientHandler = useCallback(ingredientId => {
    
    sendRequest(
      `https://react-hooks-update-d6edf-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
       'DELETE',
       null,
       ingredientId,
       'REMOVE_INGREDIENT'
      );
    
  },[sendRequest]);

  const ingredientList = useMemo(() => {
    return (<IngredientList 
              ingredients={userIngredients} 
              onRemoveItem={removeIngredientHandler}/>
    );
  },[userIngredients]);
  
  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
