
import React, {useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    const handleChange = e => {
        setTask(e.target.value);
    }
    
    const handleAddTask = (name, category) => {
        setTaskList([...taskList, { id: crypto.randomUUID(), name, category, canceled: false }]);
    };
    
    const handleSubmit = (e, category) => {
        e.preventDefault();
    
        if (task.trim().length >= 2) {
            handleAddTask(task, category);
            toast(`Success! "${task}" has been added to the list`);
        } else {
            toast(`Invalid input. ("${task}" is too short)`);
        }
    
        setTask('');
        setEditIndex(null);
    };
    

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditName(taskList[index].name);
    };
    
    const handleSaveEdit = () => {
        const updatedTaskList = [...taskList];
        
        if (editName.trim().length >= 2) {
            updatedTaskList[editIndex] = { ...updatedTaskList[editIndex], name: editName };
            toast(`Success! This task has been updated to "${editName}"`);
        } else {
            toast(`Invalid input. ("${editName}" is too short)`);
        }
    
        setTaskList(updatedTaskList);
        setEditIndex(null);
        setEditName('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSaveEdit();
        }
    };

    const handleDone = (index) => {
        const updatedItems = taskList.filter((_, i) => i !== index);
        setTaskList(updatedItems);
    };

    const handleOpen = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index && isDropdownOpen ? null : index));
        setIsDropdownOpen(true);
    };
    

    const handleCancelItem = (index) => {
        const updatedtaskList = [...taskList];
        updatedtaskList[index].canceled = !updatedtaskList[index].canceled;

        localStorage.setItem('taskList', JSON.stringify(updatedtaskList));

        setTaskList(updatedtaskList);
    };

    const getCancelLabel = (index) => {
        return taskList[index].canceled ? 'Restore' : 'Cancel';
    };

    const handleCheckboxChange = (index) => {
        setTaskList((prevTaskList) => {
                const updatedTaskList = [...prevTaskList];
                updatedTaskList[index] = {...updatedTaskList[index], canceled: !updatedTaskList[index].canceled };
            return updatedTaskList;
        });
    };


    return <AppContext.Provider value={{handleChange, getCancelLabel, openIndex, handleCancelItem, handleOpen, handleSubmit, handleDone, task, taskList, setTask, setTaskList, handleSaveEdit, handleEdit, setEditName, editName, setEditIndex, editIndex, handleKeyDown, isDropdownOpen, setIsDropdownOpen, handleCheckboxChange }}>
        {children}
    </AppContext.Provider>
}

export const useGlobContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};

