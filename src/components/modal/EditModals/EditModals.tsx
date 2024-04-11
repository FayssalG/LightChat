import EditEmail from "./EditEmail/EditEmail";
import EditPicture from "./EditImage/EditImage";
import EditUsername from "./EditUsername/EditUsername";
import EditDisplayName from "./EditDisplayName/EditDisplayName";
import EditImage from "./EditImage/EditImage";

export default function EditModals({user , whatToUpdate , onClose , isOpen}) {
    const renderEditModal = ()=>{
        switch (whatToUpdate){
            case 'displayname':
               return <EditDisplayName user={user} onClose={onClose} isOpen={isOpen}/>
        
            case 'email' : 
                return <EditEmail user={user} onClose={onClose} isOpen={isOpen}/>

            case 'image' : 
                return <EditImage user={user} onClose={onClose} isOpen={isOpen}/>

            case 'username' : 
                return <EditUsername user={user} onClose={onClose} isOpen={isOpen}/>

        }

    }

  return (
    renderEditModal()
  )
}
