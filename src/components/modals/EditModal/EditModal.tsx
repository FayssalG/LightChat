import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './EditModal.module.css';
import { IoClose } from 'react-icons/io5';
//redux
import { useDispatch , useSelector} from 'react-redux';
import { toggleShowEditModal } from '@/redux/features/UiSlice';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import EditDisplayName from './EditDisplayName/EditDisplayName';
import EditPicture from './EditPicture/EditPicture';
import { useRef, useState } from 'react';
import EditEmail from './EditEmail/EditEmail';
import EditUsername from './EditUsername/EditUsername';

interface Update{
    updateTarget:string,
    updateFn:Function
}

interface User {
    id ?: number,
    username : string,
    display_name : string,
    created_at ?: string,
    email :string,
    email_verified_at ?:string,
    image : {id : number , image:string, url:string}
}

export default function EditModal(props : {update:Update , user: User }) {
    const {update , user} = props;

    const dispatch = useDispatch()
    const showEditModal = useSelector(state=>state.ui.showEditModal);
    const {shouldRender , onAnimationEnd , animation} = useBiAnimation(showEditModal , {enter : 'popUp' , leave:'popOut'})

    const [errors , setErrors] : [ [string?] ,Function ] = useState([]);
    const infoRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleUpdate = ()=>{
        const info = infoRef.current?.files?.[0] || infoRef.current?.value;
        const password= passwordRef.current?.value;

        if(!info || !password) {
            setErrors(['Please Fill out all the fields'])
            return
        }
        
        update.updateFn(info , password)
        .then((res)=>{
            if(res.status == 204){
                dispatch(toggleShowEditModal());
            }
        })
        .catch((err)=>{
            setErrors(err.response.data.errors)
        })
    }

    const editProps =
    {
        passwordRef:passwordRef,
        infoRef:infoRef ,
        onClose:()=>dispatch(toggleShowEditModal()) ,
    }

    const renderEdit = ()=>{
        switch(update?.updateTarget){
            case "displayname": return <EditDisplayName {...editProps} old={user?.display_name}  />;
            case "username"   : return <EditUsername {...editProps}  old={user?.username}/> ;
            case "picture"   : return <EditPicture {...editProps}  old={user?.image?.url}/> ;
            case "email"     : return <EditEmail {...editProps} old={user?.email}/>
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

            <div className={styles.footer}>
                <UnstyledButton onClick={()=>dispatch(toggleShowEditModal())} className={styles.cancel}>Cancel</UnstyledButton>
                <UnstyledButton onClick={handleUpdate} className={styles.confirm}>Done</UnstyledButton>
            </div>
        </div>
    </div>
  )
}
