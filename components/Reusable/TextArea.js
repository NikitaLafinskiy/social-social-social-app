import React from 'react';
import styles from '../../styles/textarea.module.css';

const TextArea = (props) => {
  return (
    <textarea
      onChange={props.change}
      name={props.name}
      className={styles.textarea}
      placeholder={props.placeholder}
      value={props.val}
      style={props.style}
    />
  );
};

export default TextArea;
