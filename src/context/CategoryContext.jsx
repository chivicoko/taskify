// context/CategoryContext.js
import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [/* Category-related State and Functions */] = useState(/* Initial State */);

  return (
    <CategoryContext.Provider value={{/* Category-related State and Functions */}}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
