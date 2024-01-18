import React from 'react';
import styles from '../styles/style.module.css';

const TaskFilterButtons = ({ clearCategoryFilter, handleCategoryFilter }) => (
  <div className={styles.categoryBtnContainer}>
    <button className={styles.categoryBtn} onClick={clearCategoryFilter}>
      All
    </button>
    <button className={styles.categoryBtn} onClick={() => handleCategoryFilter('Family')}>
      Family
    </button>
    <button className={styles.categoryBtn} onClick={() => handleCategoryFilter('Work')}>
      Work
    </button>
    <button className={styles.categoryBtn} onClick={() => handleCategoryFilter('Personal')}>
      Personal
    </button>
  </div>
);

export default TaskFilterButtons;
