import React from 'react';
import styles from '../styles/style.module.css';

const Dropdown = ({ children }) => (
  <div className={styles.dropdown}>
    {children}
  </div>
);

export default Dropdown;
