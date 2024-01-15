import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faCancel } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import styles from '../style.module.css';
import { useGlobContext } from '../context';


const Items = () => {
    const { handleDone, openIndex, handleOpen, handleCancelItem, getCancelLabel, crosstask, taskList, display1, pad } = useGlobContext();


    return (
        <>
            {taskList.map((taskItem, index) => (
                <div key={taskItem.id} className={`${styles.taskItemContainer} ${taskItem.canceled ? styles.canceled : ''}`} style={{ border: display1, paddingInline: pad }}>
                    <div className={styles.taskitem}>
                        <h3 className={`${crosstask} ${taskItem.canceled ? styles.canceled : ''}`}>{taskItem.name}</h3>
                        <div className={styles.dropdown}>
                            <button className={styles.btnDone} onClick={() => handleOpen(index)}><FontAwesomeIcon icon={faEllipsis} /></button>

                            {openIndex === index && (
                                <ul className={styles.menu}>
                                    <li className={styles.menu_item}>
                                        <button onClick={() => handleCancelItem(index)}><FontAwesomeIcon icon={faCancel} />  {getCancelLabel(index)}</button>
                                    </li>
                                    <li id={styles.last_item} className={styles.menu_item}>
                                        <button onClick={() => handleDone(index)}><FontAwesomeIcon icon={faTrashCan} /> Delete</button>
                                    </li>
                                    <li id={styles.last_item} className={styles.menu_item}>
                                        <button onClick={() => handleDone(index)}><FontAwesomeIcon icon={faEdit} /> Edit</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Items;
