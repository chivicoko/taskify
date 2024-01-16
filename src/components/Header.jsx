
import styles from '../styles/style.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    return (
    <div className={styles.header}>
        <ToastContainer />
        <h3><span className={styles.title}>Taskify</span> <span className={styles.writeup}> <span className={styles.dash}>-</span> Stay organized through task creation</span></h3>
    </div>
    )
}

export default Header;

