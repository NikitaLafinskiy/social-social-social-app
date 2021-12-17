import React from 'react';
import styles from '../../styles/btn.module.css';

const Btn = (props) => {
  return (
    <button style={props.style} className={styles.btn} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default Btn;
