import { useCallback,useState,useEffect,useRef } from "react";
import thumbnail from './css/Resumethmbnl.png';
import Anime, {anime} from "react-anime";

const TheaterMode = (ref) =>{
                        
                        let refClassName = ref.current.className;
                        anime({targets:"."+refClassName, scale:[0.75], translateX:"10em", translateY:"40em"})
                    }

function ReturnToThumbnail(ref,initialsize){
        
        let refClassName = ref.current.className;
        console.log(refClassName);
        anime({targets: "."+refClassName,delay:50,scale:[initialsize,0.2],translateY:"40em",translateX:"-70em"})
    }

function Resume(props){
    let refElement = useRef();
    let [maximized,change] = useState(false);
    //calls this function and returns the element
    const resume = <div id="resume-container"><img src={thumbnail} ref={refElement} onClick={maximized? ()=>{ReturnToThumbnail(refElement,0.75);change(false)} : ()=>{TheaterMode(refElement);change(true)}} className="thumbnail-resume"></img>
        </div>
    console.log(refElement)
    useEffect(()=>{ReturnToThumbnail(refElement,0)},[])
    return resume
}

export default Resume