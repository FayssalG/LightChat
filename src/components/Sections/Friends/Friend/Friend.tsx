import styles from './Friend.module.css';
import avatar from '../../../../assets/avatar.png';

import { IoMdMore } from "react-icons/io";
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';


export default function Friend() {
  return (
    <>
         <UnstyledButton className={styles.friend}>
              <div className={styles.picture}>
                <img src={avatar} alt="avatar" />
              </div>

              <div className={styles.name_status}>
                  <h2 className={styles.name}>Jack Martins</h2>
                  <p className={styles.status}>online</p>
              </div>

              <div className={styles.options}>
                <IoMdMore/>
              </div>
          </UnstyledButton>

    </>
  )
}
