// context/TaskContext.js
import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [/* Task-related State and Functions */] = useState(/* Initial State */);

  return (
    <TaskContext.Provider value={{/* Task-related State and Functions */}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
