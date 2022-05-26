import React,{useState,useRef,useEffect,useCallback} from "react";
import Anime, {anime} from 'react-anime';
// If the ls[notes] exists, set base to the normal representation. If not, set it to object
// change ls[notes] directly by ls[notes] = JSON.stringify(base)
//clear by clearing 
let base = localStorage['notes']? JSON.parse(localStorage['notes']) : {'Elements':NaN,'Locations':[],'Contents':[]};
// creating an object notes in localStorage. If it already exists, reference itself. If not, create a new one
// object containing an array of react element references, react element location
// And the contents of the react element. 
//Might be natively implemented already.

function Lupdater(props){
    //
    function ListItemElement(props){ 
        // End of drag function that changes the dom elm position and reasserts the dom element 
        // in elements
        
        const DragEnd = (e)=>{
            
            let bounds = referens.current.parentElement.getBoundingClientRect();
            // get reference element of parent
            base['Locations'][props.identifier] ={top:`${e.clientY-bounds.top}px`,left:`${e.clientX-bounds.left}px`};
            // On drag end, use the position of the mouse/element to set that as the new position value
            ChangeElementState(base['Locations'][props.identifier]);
            // Update the position state 
        }
        
        // Set the current DOM element to index of base[elements]. May be useful
        let [ElementState,ChangeElementState] = useState(props.position);
        //this element now has its own properties that I can send to the Drag Handler
        const referens = useRef();
        //by default, you havent clicked anything
        
      return <span  draggable ref = {referens}
                    className = 'list-item'
                    style={ElementState} 
                    onDragEnd = {(e)=>DragEnd(e)}
                    >{props.contents}</span>;
    }
    
    let xa = <Anime delay = {anime.stagger(100)}
                    scale={[0.1,0.9]}>
              {props.lists.map(useCallback((x,id)=><ListItemElement  identifier = {id} key = {id} contents={x} position={props.positionStates[id]}/>),[props.list])}
              </Anime>
    return xa;
  }

function Notes(){
    const [note,UpdateNote] = useState('');
    const [listitem,UpdateList] = useState(base['Contents']);//initial state to the stored values
    const [positions, updatePos] = useState(base['Locations']);// initial state to the stored values
    
    //localStorage['notes'] = JSON.stringify(base);
    // 
    function events(e){
        if (e.key === 'Enter'){
            if (note !== ''){
            console.log(base['Contents'], "old");
            base['Contents'].push(note);//send in note to base[contents]
            console.log(base['Contents'], "new");
            UpdateList(base['Contents']); // update the apparent list to show base[contents]
            UpdateNote('');//set the input box to blank
            base['Locations'].push({top:`${Math.random()* 45}em`, left:`${Math.random()* 95}%`});
            //add a randomlized location to base[location]
            updatePos(base['Locations']);//set the positions list
            }
        }
    }
    // Need to update base[Locations]. Will implement later
    
    return (
      <div id="webContent">
        <div id="post-widget">
          
            <input type="text" value = {note} onInput={(x) => {UpdateNote(x.target.value); window.addEventListener('keypress',events,{once:true})}} ></input>
            <span className='generic-button'
            onClick={()=>localStorage['notes'] = JSON.stringify(base)}>Save</span>
            <span className='generic-button' 
                  onClick={a=>{console.log('Clear all note data from the DOM');
                  base = {'Elements':[],'Locations':[],'Contents':[]};
                  localStorage.clear();
                  updatePos(base['Locations'])
                  UpdateNote('')
                  UpdateList([])}}>Clear</span>
    
        </div>
        <div id="note-mapper">
        <Lupdater lists={listitem} positionStates={positions} />
        </div>
        
      </div>
      );
  }
export default Notes