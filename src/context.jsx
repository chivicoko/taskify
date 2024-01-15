import React, {useContext, useEffect, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('lstaskList')) || []);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [categories, setCategories] = useState(['Family', 'Work', 'Personal']);

    useEffect(() => {
        localStorage.setItem('lstaskList', JSON.stringify(taskList));
    }, [taskList]);

    const handleChange = e => {
        setTask(e.target.value);
    }

    // const handleSubmit = e => {
    //     e.preventDefault();

    //     if (task.trim().length !== 0 && task.trim().length !== 1 && task.trim().length !== 2) {
    //         setTaskList([...taskList, {id:crypto.randomUUID(), name:task, category: '', canceled: false}]);
    //         toast(`Success! "${task}" has been added to the list)`);
    //     } else {
    //         toast(`Invalid input. ("${task}" is too short)`);
    //     }

    //     setTask('');
    // }
    
    // Update your handleAddTask function to include the category
const handleAddTask = (name, category) => {
    // Other logic for adding a task
    setTaskList([...taskList, { id: crypto.randomUUID(), name, category, canceled: false }]);
    // Other logic
  };
  
  // In your context or where you handle the form submission
  const handleSubmit = (e, category) => {
    e.preventDefault();
  
    if (task.trim().length !== 0 && task.trim().length !== 1 && task.trim().length !== 2) {
      // Instead of directly adding the task, use the handleAddTask function
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
        
        if (editName.trim().length !== 0 && editName.trim().length !== 1 && editName.trim().length !== 2) {
            updatedTaskList[editIndex] = { ...updatedTaskList[editIndex], name: editName };
            toast(`Success! This task has been updated to "${editName}"`);
        } else {
            toast(`Invalid input. ("${editName}" is too short)`);
        }
    
        setTaskList(updatedTaskList);
        setEditIndex(null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSaveEdit();
        }
    };

    const handleDone = index => {
        const updatedItems = [...taskList];
        updatedItems.splice(index, 1);
        setTaskList(updatedItems);
    }

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
            updatedTaskList[index] = {
                ...updatedTaskList[index],
                canceled: !updatedTaskList[index].canceled,
            };
            return updatedTaskList;
        });
    };


    return <AppContext.Provider value={{handleChange, getCancelLabel, openIndex, handleCancelItem, handleOpen, handleSubmit, handleDone, task, taskList, setTask, setTaskList, handleSaveEdit, handleEdit, setEditName, editName, setEditIndex, editIndex, handleKeyDown, isDropdownOpen, setIsDropdownOpen, handleCheckboxChange, categories, setCategories }}>
        {children}
    </AppContext.Provider>
}

export const useGlobContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};