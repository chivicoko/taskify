import styles from '../style.module.css';
import { useGlobContext } from '../context';
import Items from './Items';

const Form = () => {
    const {handleChange, handleSubmit, task} = useGlobContext();

  return (
    <div className={styles.taskform}>
        <div className={styles.container} id='parentDiv'>
            <form onSubmit={handleSubmit}>
                <input className={styles.taskinput} value={task} onChange={handleChange} type="text" placeholder='Write a task here' />
                <button className={styles.taskbutton} type='submit'>Add</button>
            </form>
            <Items/>
        </div>
    </div>
  )
}

export default Form;