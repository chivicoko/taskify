
import React, {useContext, useEffect, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('lstaskList')) || []);
    const [editIndex, setEditIndex] = useState(null);
    const [categories, setCategories] = useState(['Family', 'Work', 'Personal']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('');

    useEffect(() => {
        localStorage.setItem('lstaskList', JSON.stringify(taskList));
    }, [taskList]);

    const handleChange = e => {
        setTask(e.target.value);
    }
    
    const handleAddTask = (name, category) => {
        setTaskList([...taskList, { id: crypto.randomUUID(), name, category, canceled: false }]);
    };
    
    const handleSubmit = (e, category) => {
        e.preventDefault();
    
        // if (task.trim().length >= 2) {
        if (task.trim().length !== 0 && task.trim().length !== 1 && task.trim().length !== 2) {
            handleAddTask(task, category);
            toast(`Success! "${task}" has been added to the list`);
        } else {
            toast(`Invalid input. ("${task}" is too short)`);
        }
    
        setTask('');
        setEditIndex(null);
    };
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setNewTaskCategory(category);
    };

    return <AppContext.Provider value={{ handleChange, handleSubmit, task, editIndex, setEditIndex, handleCategorySelect, categories, setCategories, selectedCategory, newTaskCategory, setNewTaskCategory }}>
        {children}
    </AppContext.Provider>
}

const useFormContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useFormContext};

