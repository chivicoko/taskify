
import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faCancel, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/style.module.css';
import { useGlobContext } from '../context/context';
import Button from './Button';
import ListItem from './ListItem';
import Input from './Input';
import Dropdown from './Dropdown';
import TaskFilterButtons from './TaskFilterButtons';

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const inputRef = useRef(null);

  const {
    handleDone,
    openIndex,
    handleOpen,
    handleCancelItem,
    getCancelLabel,
    crosstask,
    taskList,
    display1,
    pad,
    handleEdit,
    handleSaveEdit,
    editIndex,
    setEditIndex,
    editName,
    setEditName,
    handleKeyDown,
    isDropdownOpen,
    setIsDropdownOpen,
    handleCheckboxChange
  } = useGlobContext();

  useEffect(() => {
    if (editIndex !== null && inputRef.current) {
      inputRef.current.focus?.();
    }
  }, [editIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [openIndex, isDropdownOpen, setIsDropdownOpen]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const filteredTasks = selectedCategory
    ? taskList.filter((taskItem) => taskItem.category === selectedCategory)
    : taskList;

  return (
    <>
      {taskList.length === 0 ? (
        <div className={styles.categoryBtnContainer}>
          <p>
            <span>No tasks yet.</span> <br /> Enter your tasks in the input above
          </p>
        </div>
      ) : (
        <TaskFilterButtons clearCategoryFilter={clearCategoryFilter} handleCategoryFilter={handleCategoryFilter} />
      )}
      {filteredTasks.map((taskItem, index) => (
        <div
          key={taskItem.id}
          className={`${styles.taskItemContainer} ${taskItem.canceled ? styles.canceled : ''}`}
          style={{ border: display1, paddingInline: pad }}
        >
          <div className={styles.taskitem}>
            {editIndex === index ? (
              <div className={styles.edit__container}>
                <Input
                  ref={inputRef}
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className={styles.btns}>
                  <Button onClick={handleSaveEdit} icon={<FontAwesomeIcon icon="fas fa-save" />} label="Save" />
                  <Button onClick={() => setEditIndex(null)} icon={<FontAwesomeIcon icon="fas fa-save" />}label="Cancel" />
                </div>
              </div>
            ) : (
              <>
                <h3 className={`${crosstask} ${taskItem.canceled ? styles.canceled : ''}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={taskItem.canceled}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <span className={styles.checkboxLabel}>{taskItem.name}</span>
                  </label>
                  {taskItem.category ? (
                    <span className={styles.categoryLabel}> ({taskItem.category})</span>
                  ) : (
                    <span className={styles.uncategorizedLabel}>
                      <em> (Uncategorized)</em>
                    </span>
                  )}
                </h3>
                <div className={styles.dropdown}>
                  <Button
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      handleOpen(index);
                    }}
                    icon={faEllipsis}
                    label=''
                  />
                  {openIndex === index && isDropdownOpen && (
                    <Dropdown>
                      <ul className={`${styles.menu} ${styles.dropdownMenu}`}>
                        <ListItem onClick={() => handleCancelItem(index)} icon={faCancel} label={getCancelLabel(index)} />
                        <ListItem onClick={() => handleDone(index)} icon={faTrashCan} label="Delete" />
                        <ListItem onClick={() => handleEdit(index)} icon={faEdit} label="Edit" />
                      </ul>
                    </Dropdown>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Items;

