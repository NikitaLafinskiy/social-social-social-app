import React from 'react';
import styles from '../../styles/error.module.css';

const Error = (props) => {
  const err =
    props.children === undefined || props.children === null ? (
      ''
    ) : (
      <div style={props.style} id={styles.errorWrap}>
        <p id={styles.error}>{props.children} </p>
      </div>
    );
  return err;
};

export default Error;
