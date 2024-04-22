import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './FriendDetails.module.css';
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';


export default function FriendDetails({friend , onClose}) {
  
  
    //handle closing with the back button
    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);

        const handleCloseOnBackButton = (event) => {
            event.preventDefault();
            onClose()
        };

        window.addEventListener('popstate', handleCloseOnBackButton);
    
        return () => window.removeEventListener('popstate', handleCloseOnBackButton);
    
    },[])

  return (
  <div className={styles.container}>
      
          <UnstyledButton onClick={onClose} className={styles.close}>
              <IoClose/>
          </UnstyledButton>
    
          <div className={styles.header}>
              <div className={styles.picture}>
                  <img src={friend.image} alt="" />
              </div>         
              <div className={styles.displayname_username}>
                  <h2 className={styles.displayname}>
                      {friend.display_name}
                  </h2>
                  <p className={styles.username}>
                      @{friend.username}
                  </p>
              </div>       
          </div>

          <div className={styles.body}>
              <div className={styles.about}>
                  <h3>About</h3>
                  <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quisquam, dicta ea odio necessitatibus eaque omnis? Rerum laborum velit nam cupiditate illum aperiam quia reprehenderit, quibusdam est. Quod, quia consequatur!
                  </p>
              </div>

              <div className={styles.member_since}>
                  <h3>Member since</h3>
                  <p>Jun 05, 2022</p>
              </div>
          </div>
  </div>
  )
}
