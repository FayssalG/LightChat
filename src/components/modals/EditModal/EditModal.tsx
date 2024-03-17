import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './EditModal.module.css';
import { IoClose } from 'react-icons/io5';
//redux
import { useDispatch , useSelector} from 'react-redux';
import { toggleShowEditModal } from '@/redux/features/UiSlice';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import EditDisplayName from './EditDisplayName/EditDisplayName';
import EditPicture from './EditPicture/EditPicture';
import { useEffect, useRef, useState } from 'react';
import EditEmail from './EditEmail/EditEmail';
import EditUsername from './EditUsername/EditUsername';
import { setIsLoading } from '@/redux/features/UiSlice';
import Spinner from '@/components/shared/Spinner/Spinner';

interface Update{
    updateTarget:string,
    updateFn:Function
}


export default function EditModal(props : {update:Update , infos: User }) {
    const {update , infos} = props;
    const dispatch = useDispatch()
    const showEditModal = useSelector(state=>state.ui.showEditModal);
    const isLoading = useSelector(state=>state.ui.isLoading);
    const {shouldRender , onAnimationEnd , animation} = useBiAnimation(showEditModal , {enter : 'popUp' , leave:'popOut'})

    const [errors , setErrors] : [ [string?] ,Function ] = useState([]);
    const infoRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    //empty errors when modal closes
    useEffect(()=>{
        if(shouldRender == false){
            setErrors([]);
        }
    },[shouldRender])

    const handleUpdate = (e:React.FormEvent)=>{
        e.preventDefault();
        const info = infoRef.current?.files?.[0] || infoRef.current?.value;
        const password= passwordRef.current?.value;

        if(!info || !password) {
            setErrors(['Please Fill out all the fields'])
            return
        }
        
        dispatch(setIsLoading(true))
        update.updateFn(info , password)
        .then((res)=>{
            if([204,200,201].includes(res.status)){
                setErrors([]);
                dispatch(toggleShowEditModal());
            }
        })
        .catch((err)=>{
            setErrors(err.response.data.errors)
        })
        .finally(()=>{
            dispatch(setIsLoading(false))
        })
    }

   

    const renderEdit = ()=>{
        const editProps =
        {
            passwordRef:passwordRef,
            infoRef:infoRef ,
            onClose:()=>dispatch(toggleShowEditModal()) ,
            onSubmit : handleUpdate
        }   
         
        switch(update?.updateTarget){
            case "displayname": return <EditDisplayName {...editProps} old={infos.displayName}  />;
            case "username"   : return <EditUsername {...editProps}  old={infos.username}/> ;
            case "picture"   : return <EditPicture {...editProps}  old={infos.image}/> ;
            case "email"     : return <EditEmail {...editProps} old={infos.email}/> ;
        }
        
    }


    if(!shouldRender) return null

    return (
    <div className={styles.container}>
        <div style={{animation:animation}} onAnimationEnd={onAnimationEnd} className={styles.inner_container}>

                {renderEdit() }

                <div className={styles.errors}>
                    {
                    errors.map((err)=><p>{err}</p>)
                    }
                </div>
        

            {
                <div className={styles.footer}>
                    <UnstyledButton  disabled={isLoading} onClick={()=>dispatch(toggleShowEditModal())} className={styles.cancel}>Cancel</UnstyledButton>
                    <UnstyledButton type='submit' form='form' disabled={isLoading} className={styles.confirm}>{isLoading ? <Spinner size={25}/> : 'Done'}</UnstyledButton>
                </div>
            }

        </div>
    </div>
  )
}
