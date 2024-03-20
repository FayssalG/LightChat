import { useSelector } from "react-redux"
import { LazyComponent } from "./LazyComponent";


interface IModalProviderProps {
    children: React.ReactNode;
}

export default function ModalProvider(props : IModalProviderProps) {
    const modals = useSelector(state=>state.modal);
    const openModalsArray = Object.keys(modals).filter(modalId=>modals[modalId].open == true);
    
    console.log({modals})
 return (
    <>
        {
            openModalsArray.map((filename)=>{
                return <LazyComponent key={filename} filename={filename}/>
            })            
        }

        {props.children}

    </>
  )
}
