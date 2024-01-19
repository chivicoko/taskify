

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ onClick, icon, label, className }) => (
  <button onClick={onClick} className={className}>
    <FontAwesomeIcon icon={icon} /> {label}
  </button>
);

export default Button;
