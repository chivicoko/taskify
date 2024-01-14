import styles from '../style.module.css';
import { useGlobContext } from '../context';
import Items from './Items';

const Form = () => {
    const {handleChange, handleSubmit, todo} = useGlobContext();

  return (
    <div className={styles.todoform}>
        <div className={styles.container} id='parentDiv'>
            <form onSubmit={handleSubmit}>
                <input className={styles.todoinput} value={todo} onChange={handleChange} type="text" placeholder='Write a task here' />
                <button className={styles.todobutton} type='submit'>Add</button>
            </form>
            <Items/>
        </div>
    </div>
  )
}

export default Form;