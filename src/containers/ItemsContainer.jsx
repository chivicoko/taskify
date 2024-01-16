// containers/ItemsContainer.js
import React from 'react';
import Items from '../components/Items';
import { TaskProvider } from '../context/TaskContext';
import { CategoryProvider } from '../context/CategoryContext';

const ItemsContainer = () => {
  return (
    <TaskProvider>
      <CategoryProvider>
        <Items />
      </CategoryProvider>
    </TaskProvider>
  );
};

export default ItemsContainer;
