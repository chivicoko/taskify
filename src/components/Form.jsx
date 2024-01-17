
import React, { useState } from 'react';
import styles from '../styles/style.module.css';
import Items from './Items';
import { useGlobContext } from '../context/context';

const Form = () => {
  const { handleChange, handleSubmit, task } = useGlobContext();

  const [categories, setCategories] = useState(['Family', 'Work', 'Personal']);
  const [newTaskCategory, setNewTaskCategory] = useState('');

  const handleCategorySelect = (category) => {
    setNewTaskCategory(category);
  };

  return (
    <div className={styles.taskform}>
      <div className={styles.container} id="parentDiv">
        <form onSubmit={(e) => handleSubmit(e, newTaskCategory)}>
          <input className={styles.taskinput} value={task} onChange={handleChange} type="text" placeholder="Enter a task here" />
          
          <label>
            <span>Category:</span>
            <select className={styles.categoryDropdown} value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)}>
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="" >None</option>
            </select>
          </label>

          <button className={styles.taskbutton} type="submit"> Add </button>
        </form>
        <Items />
      </div>
    </div>
  );
};

export default Form;


