import { closeModal, openModal } from "@/redux/features/ModalSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function useModal(modalFileName : string){
    const isOpen = useSelector(state=>state.modal[modalFileName]?.open);
    
    const dispatch = useDispatch();

    const onOpen = useCallback((meta)=>{
        dispatch(openModal({filename:modalFileName , meta}))
    },[modalFileName])

    const onClose = useCallback(()=>{
        dispatch(closeModal(modalFileName))
    },[modalFileName])

    return  {isOpen , onOpen, onClose} ;
}