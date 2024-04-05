import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './EditModal.module.css';
import { IoClose } from 'react-icons/io5';
//redux
import { useDispatch , useSelector} from 'react-redux';
import { setGlobalLoading, toggleShowEditModal } from '@/redux/features/UiSlice';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import EditDisplayName from './EditDisplayName/EditDisplayName';
import EditPicture from './EditPicture/EditPicture';
import { useEffect, useRef, useState } from 'react';
import EditEmail from './EditEmail/EditEmail';
import EditUsername from './EditUsername/EditUsername';
import Spinner from '@/components/shared/Spinner/Spinner';
import { BaseModal } from '../BaseModal';

interface Update{
    updateTarget:string,
    updateFn:Function
}


export default function EditModal(props) {
    const {user , whatToUpdate , updateFn , onClose , isOpen} = props;

    const dispatch = useDispatch()
    const [isLoading , setIsLoading] = useState(false);
    
    const [errors , setErrors] : [ [string?] ,Function ] = useState([]);
    const infoRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
 
    
    //empty errors when modal closes
    const handleUpdate = (e:React.FormEvent)=>{
        e.preventDefault();
        const info = infoRef.current?.files?.[0] || infoRef.current?.value;
        const password= passwordRef.current?.value;

        if(!info || !password) {
            setErrors(['Please Fill out all the fields'])
            return
        }
        
        setIsLoading(true)
        updateFn(info , password)
        .then((res)=>{
            if([204,200,201].includes(res.status)){
                setErrors([]);
                onClose();
            }
        })
        .catch((err)=>{
            setErrors(err.response.data.errors)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

   

    const renderEdit = ()=>{
        const editProps =
        {
            passwordRef:passwordRef,
            infoRef:infoRef ,
            onClose,
            onSubmit : handleUpdate
        }   
         
        switch(whatToUpdate){
            case "displayname": return <EditDisplayName {...editProps} old={user.display_name}  />;
            case "username"   : return <EditUsername {...editProps}  old={user.username}/> ;
            case "picture"   : return <EditPicture {...editProps}  old={user.image}/> ;
            case "email"     : return <EditEmail {...editProps} old={user.email}/> ;
        }
        
    }


    
    return (
    <BaseModal onClose={onClose} show={isOpen} >
        <div className={styles.inner_container}>

                {renderEdit() }

                <div className={styles.errors}>
                    {
                    errors.map((err)=><p>{err}</p>)
                    }
                </div>
        

            {
                <div className={styles.footer}>
                    <UnstyledButton  disabled={isLoading} onClick={onClose} className={styles.cancel}>Cancel</UnstyledButton>
                    <UnstyledButton type='submit' form='form' disabled={isLoading} className={styles.confirm}>{isLoading ? <Spinner size={25}/> : 'Done'}</UnstyledButton>
                </div>
            }

        </div>
    </BaseModal>
  )
}
