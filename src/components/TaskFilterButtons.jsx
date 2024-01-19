
import React from 'react';
import styles from '../styles/style.module.css';
import Button from './Button';

const TaskFilterButtons = ({ clearCategoryFilter, handleCategoryFilter }) => {
  const buttons = [
    { label: 'All', onClick: clearCategoryFilter, icon: '' },
    { label: 'Family', onClick: () => handleCategoryFilter('Family'), icon: '' },
    { label: 'Work', onClick: () => handleCategoryFilter('Work'), icon: '' },
    { label: 'Personal', onClick: () => handleCategoryFilter('Personal'), icon: '' },
  ];

  return (
    <div className={styles.categoryBtnContainer}>
      {buttons.map((button, index) => (
        <Button key={index} onClick={button.onClick} icon={button.icon} label={button.label} className={styles.categoryBtn} />
      ))}
    </div>
  );
};

export default TaskFilterButtons;
