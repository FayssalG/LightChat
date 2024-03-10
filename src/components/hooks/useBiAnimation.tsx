//this hook provide a way to handle bi derctional animations (mount/unMount)

import { useState , useEffect} from "react";

type Animation = {
    enter : string,
    leave :string,
    duration  ?: number
}

export default function useBiAnimation(show : Boolean = false , {enter , leave , duration=200} : Animation) 
{

    const [shouldRender , setShouldRender] = useState(show)

    //handle mount/unmount animations
    useEffect(()=>{
        if (show) setShouldRender(true);
    },[show])

    const onAnimationEnd = ()=>{
        if(!show) setShouldRender(false)
    }

    const animation = `${show ? enter : leave} ${duration}ms forwards`; 
    return {shouldRender , onAnimationEnd , animation}

}

