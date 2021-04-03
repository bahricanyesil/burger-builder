import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={props.removeHelper} disabled={props.disabled}>Less</button>
      <button className={classes.More} onClick={props.addHelper}>More</button>
    </div>
  );
};

export default buildControl;