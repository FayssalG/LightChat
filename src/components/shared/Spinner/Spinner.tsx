import { CgSpinner } from "react-icons/cg";
import styles from './Spinner.module.css';

export default function Spinner(props) {
  return (
    <CgSpinner {...props} className={styles.spinner}/>
  )
}
