import React from 'react';
import styles from '../styles/style.module.css';

const TaskLabel = ({ category, onChange, value, categories }) => (
  <label>
    <span>Category:</span>
    <select className={styles.categoryDropdown} value={value} onChange={onChange}>
      <option value="" disabled>Select a category</option>
      {categories.map((categoryItem) => (
        <option key={categoryItem} value={categoryItem}>
          {categoryItem}
        </option>
      ))}
      <option value="">None</option>
    </select>
  </label>
);

export default TaskLabel;
