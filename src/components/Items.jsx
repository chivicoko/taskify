
import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/style.module.css';
import { useGlobContext } from '../context/context';
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
        <div className={styles.categoryBtnContainer}>
            <button className={styles.categoryBtn} onClick={() => clearCategoryFilter()}>All</button>
            <button className={styles.categoryBtn} onClick={() => handleCategoryFilter('Family')}>Family</button>
            <button className={styles.categoryBtn} onClick={() => handleCategoryFilter('Work')}>Work</button>
            <button className={styles.categoryBtn} onClick={() => handleCategoryFilter('Personal')}>Personal</button>
      </div>
      {filteredTasks.map((taskItem, index) => (
        <div
          key={taskItem.id}
          className={`${styles.taskItemContainer} ${taskItem.canceled ? styles.canceled : ''}`}
          style={{ border: display1, paddingInline: pad }}
        >
          <div className={styles.taskitem}>
            {editIndex === index ? (
              <div className={styles.edit__container}>
                <input ref={inputRef} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={handleKeyDown} />
                <div className="btns">
                  <button className={styles.editBtn} onClick={handleSaveEdit}>Save</button>
                  <button className={styles.editBtn} onClick={() => setEditIndex(null)}>Cancel</button>
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
                    <span className={styles.uncategorizedLabel}><em> (Uncategorized)</em></span>
                  )}
                </h3>
                <div className={styles.dropdown}>
                  <button
                    className={styles.btnDone}
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      handleOpen(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>

                  {openIndex === index && isDropdownOpen && (
                    <ul className={`${styles.menu} ${styles.dropdownMenu}`}>
                      <li className={styles.menu_item} id={styles.first_item}>
                        <button onClick={() => handleCancelItem(index)}>
                          <FontAwesomeIcon icon={faCancel} /> {getCancelLabel(index)}
                        </button>
                      </li>
                      <li className={styles.menu_item}>
                        <button onClick={() => handleDone(index)}>
                          <FontAwesomeIcon icon={faTrashCan} /> Delete
                        </button>
                      </li>
                      <li className={styles.menu_item} id={styles.last_item}>
                        <button onClick={() => handleEdit(index)}>
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                      </li>
                    </ul>
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

