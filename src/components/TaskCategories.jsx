import React from 'react';
import { useFormContext } from '../context/formContext';

const TaskCategories = () => {
  const { categories } = useFormContext();

  return (
    <>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
    </>
  )
}

export default TaskCategories;