
import React, { useState } from 'react';
import styles from '../styles/style.module.css';
import Items from '../components/Items';
import { useGlobContext } from '../context/context';
import TaskLabel from '../components/TaskLabel';
import Input from '../components/Input';

const Home = () => {
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
          <Input
            ref={(inputRef) => inputRef && inputRef.focus()}
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Enter a task here"
            className={styles.taskinput}
          />

          <TaskLabel
            category="Category"
            onChange={(e) => setNewTaskCategory(e.target.value)}
            value={newTaskCategory}
            categories={categories}
          />
          <button className={styles.taskbutton} type="submit"> Add </button>
        </form>
        <Items />
      </div>
    </div>
  );
};

export default Home;
