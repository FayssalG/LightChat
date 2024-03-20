import { closeModal } from "@/redux/features/ModalSlice";
import { Suspense, lazy, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import useBiAnimation from "../hooks/useBiAnimation";

interface ILazyComponentProps{
    filename : string;
}

export function LazyComponent({filename}:ILazyComponentProps) {

    console.log(`loading ./${filename}/${filename}.tsx`);

    const dispatch = useDispatch();
    const isOpen = useSelector(state=>state.modal[filename]?.open);
    const meta = useSelector(state=>state.modal[filename]?.meta);
    
    const handleModalClose = ()=>{
        dispatch(closeModal(filename));
    }

    const Component = lazy(()=>import(`./${filename}/${filename}.tsx`));

    return (
        <Suspense fallback={null}>
            <ErrorBoundary>
                {
                    filename ?
                        <Component isOpen={isOpen} onClose={handleModalClose}  {...meta}/>
                    :
                        null
                }
            </ErrorBoundary>
        </Suspense>
    )
}
