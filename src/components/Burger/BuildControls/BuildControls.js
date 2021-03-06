import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map((control) => {
        return <BuildControl key={control.label} label={control.label} addHelper={() => props.addIngredient(control.type)} removeHelper={() => props.removeIngredient(control.type)} disabled={props.disabled[control.type]} />
      })}
      <button onClick={props.orderHandler} disabled={!props.purchasable} className={classes.OrderButton}>ORDER NOW!</button>
    </div>
  );
};

export default buildControls;