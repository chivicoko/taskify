
import React, { useState } from 'react';
import styles from '../styles/style.module.css';
import Items from './Items';
import TaskCategories from './TaskCategories';
import { useFormContext } from '../context/formContext';

const Form = () => {
  const { handleChange, handleSubmit, task, handleCategorySelect, selectedCategory, newTaskCategory, setNewTaskCategory } = useFormContext();

  return (
    <div className={styles.taskform}>
      <div className={styles.container} id="parentDiv">
        <form onSubmit={(e) => handleSubmit(e, newTaskCategory)}>
          <input className={styles.taskinput} value={task} onChange={handleChange} type="text" placeholder="Enter a task here" />
          
          <label>
            <span>Category:</span>
            <select className={styles.categoryDropdown} value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)}>
                <option value="" disabled>Select a category</option>
                <TaskCategories />
            </select>
        </label>
          <button className={styles.taskbutton} type="submit">
            Add
          </button>
        </form>
        {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
        <Items />
      </div>
    </div>
  );
};

export default Form;


