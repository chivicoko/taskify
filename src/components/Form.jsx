// Form.js
import React, { useState } from 'react';
import styles from '../style.module.css';
import { useGlobContext } from '../context';
import Items from './Items';

const Form = () => {
  const { handleChange, handleSubmit, task } = useGlobContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const categories = ['Family', 'Work', 'Personal']; // Your category options

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setNewTaskCategory(category);
  };

  return (
    <div className={styles.taskform}>
      <div className={styles.container} id="parentDiv">
        <form onSubmit={(e) => handleSubmit(e, newTaskCategory)}>
          <input
            className={styles.taskinput}
            value={task}
            onChange={handleChange}
            type="text"
            placeholder="Write a task here"
          />
          <label>
            Category:
            <select
              className={styles.categoryDropdown}
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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
