import { FcEndCall } from 'react-icons/fc';
import styles from './VoiceCall.module.css';
import avatar from '@/assets/avatar.png';
import { BiPhoneOff } from 'react-icons/bi';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';

export default function VoiceCall() {
  return (
    <div className={styles.container}>

        <div className={styles.friend}>
            <div className={styles.picture}>
                <img src={avatar} alt="" />
            </div>
            <p className={styles.name}>Jack Martins</p>
        </div>

        <div className={styles.controls}>
            <UnstyledButton className={styles.endcall_btn}>
                <BiPhoneOff/>
            </UnstyledButton>
        </div>
    </div>
  )
}
