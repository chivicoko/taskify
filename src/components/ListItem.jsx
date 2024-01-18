import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListItem = ({ onClick, icon, label }) => (
  <li>
    <button onClick={onClick}>
      <FontAwesomeIcon icon={icon} /> {label}
    </button>
  </li>
);

export default ListItem;