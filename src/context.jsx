import React, {useContext, useEffect, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [openIndex, setOpenIndex] = useState(null);

    // task section
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('lstaskList')) || []);
    // const [taskList, setTaskList] = useState(() => {
    //     const storedtaskList = JSON.parse(localStorage.getItem('lstaskList')) || [];
    //     return storedtaskList;
    // });
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');


    useEffect(() => {
        localStorage.setItem('lstaskList', JSON.stringify(taskList));
    }, [taskList]);

    const handleChange = e => {
        setTask(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (task.trim().length !== 0 && task.trim().length !== 1 && task.trim().length !== 2) {
            setTaskList([...taskList, {id:crypto.randomUUID(), name:task}]);
            toast(`Success! "${task}" has been added to the list)`);
        } else {
            toast(`Invalid input. ("${task}" is too short)`);
        }

        setTask('');
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditName(taskList[index].name);
    };
    
    const handleSaveEdit = () => {
        // Assuming 'editName' is the edited name from the input field
        const updatedTaskList = [...taskList];
        
        if (editName.trim().length !== 0 && editName.trim().length !== 1 && editName.trim().length !== 2) {
            updatedTaskList[editIndex] = { ...updatedTaskList[editIndex], name: editName };
            toast(`Success! "${editName}" has been updated in the list`);
        } else {
            toast(`Invalid input. ("${editName}" is too short)`);
        }
    
        setTaskList(updatedTaskList);
        setEditIndex(null);
    };

    const handleDone = index => {
        const updatedItems = [...taskList];
        updatedItems.splice(index, 1);
        setTaskList(updatedItems);
    }
    
    const handleOpen = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
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


    return <AppContext.Provider value={{handleChange, getCancelLabel, openIndex, handleCancelItem, handleOpen, handleSubmit, handleDone, task, taskList, setTask, setTaskList, handleSaveEdit, handleEdit, setEditName, editName, setEditIndex, editIndex }}>
        {children}
    </AppContext.Provider>
}

export const useGlobContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};