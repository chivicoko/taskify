import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/style.module.css';

const Button = ({ onClick, icon, label }) => (
  <button onClick={onClick} className={styles.dropdownBtn}>
    <FontAwesomeIcon icon={icon} /> {label}
  </button>
);

export default Button;
