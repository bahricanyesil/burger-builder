import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.8,
  cheese: 1.2,
  meat: 3.5,
  bacon: 0.4
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    ordered: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHelper = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHelper = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  orderHandler = () => {
    this.setState({ ordered: true });
  }

  orderCancelHandler = () => {
    this.setState({ ordered: false });
  }

  orderContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal modalClosed={this.orderCancelHandler} show={this.state.ordered}><OrderSummary price={this.state.totalPrice} orderCancelled={this.orderCancelHandler} orderContinued={this.orderContinueHandler} ingredients={this.state.ingredients} /></Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls orderHandler={this.orderHandler} purchasable={this.state.purchasable} price={this.state.totalPrice} disabled={disabledInfo} addIngredient={this.addIngredientHelper} removeIngredient={this.removeIngredientHelper} />
      </Aux>
    );
  }
}

export default BurgerBuilder;