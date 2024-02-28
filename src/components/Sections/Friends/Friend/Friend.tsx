import styles from './Friend.module.css';
import avatar from '../../../../assets/avatar.png';

import { IoMdMore } from "react-icons/io";
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';


export default function Friend() {
  return (
    <>
         <div className={styles.friend}>
              <div className={styles.picture}>
                <img src={avatar} alt="avatar" />
              </div>

              <UnstyledButton className={styles.name_status}>
                  <h2 className={styles.name}>Jack Martins</h2>
                  <p className={styles.status}>online</p>
              </UnstyledButton>

              <div className={styles.options}>
                <IoMdMore/>
              </div>
          </div>

    </>
  )
}
