import React from 'react';
import styles from '../../styles/input.module.css';

const Input = (props) => {
  return (
    <input
      className={styles.input}
      name={props.name}
      onChange={props.change}
      value={props.val}
      placeholder={props.placeholder}
      style={props.styles}
    />
  );
};

export default Input;
