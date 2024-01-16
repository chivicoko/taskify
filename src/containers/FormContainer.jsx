// containers/FormContainer.js
import React from 'react';
import Form from '../components/Form';
import { TaskProvider } from '../context/TaskContext';
import { CategoryProvider } from '../context/CategoryContext';

const FormContainer = () => {
  return (
    <TaskProvider>
      <CategoryProvider>
        <Form />
      </CategoryProvider>
    </TaskProvider>
  );
};

export default FormContainer;
