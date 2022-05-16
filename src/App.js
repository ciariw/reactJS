import './App.css';
import './css/bootstrap.css';
import React ,{useState, useEffect, useRef} from 'react';


function App() {
  return (
  <div id="page">
    <header>
      <h1 className="display-4">Emeka Ariwodo</h1>
    </header>
   <AppBody/>
  </div>)
}

const SeachBar = () => {
    return (
    <>
    <form>
      <label>
        <input type="text" name="search"></input>
        <span id="button">Submit</span>
      </label>
    </form>
    </>
    );
}

function Home(){
  return (<>
    <h1>Home page</h1>
    </>);
}
function Quote(){
  return (<>
    <h1>Quote page</h1>
    </>);
}
function Resume(){
  return (<>
    <h1>Resume page</h1>
    </>);
}
function About(){
  return (<>
    <h1>About page</h1>
    </>);
}
class ElementReferencer extends React.Component{
  constructor(props){
    super(props);
    this.self = React.createRef();

  }

}
function Lupdater(props){
  // After I hit enter, I want to add another list item to the returned unordered list
  //create a function that accepts the list and returns
  // The reason why it executes twice is that it calls list update function
  // I want to randomly generata a location that doesnt exist already
  
  function ListItemElement(props){ 
    let [ElementState,ChangeElementState] = useState(props.position);
    let [Clicked, ChangeClick] = useState(false);
    //this element now has its own properties that I can send to the Drag Handler
    const referens = useRef(null);
    //by default, you havent clicked anything
    const evl = (v) => {
      console.log(Clicked)
      if (Clicked){
      console.log(Clicked)
      ChangeElementState({top:v.clientY -v.target.offsetTop+50, left:v.clientX});
      }
    }
    
    return <span  ref = {referens}
                  className = 'list-item'
                  onClick={()=>{window.addEventListener('mousemove',evl,true);ChangeClick(!Clicked); console.log(Clicked)}}
                  
                  style={ElementState} 
                  >{props.contents}</span>;
  }

  const notemap = props.lists.map((x,id)=><ListItemElement key = {id} contents={x} position={props.positionStates[id]}/>);
  return notemap;
}
const Fun = ()=>{
  const [note,UpdateNote] = useState('');
  const [listitem,Listupdater] = useState([]);
  const [positions, updatePos] = useState([]);

  let templist = listitem.slice();
  let tempcoord = positions.slice();

  useEffect(()=>{
    
    window.addEventListener('keypress',(eventcode)=>{
      if (eventcode.key === 'Enter'){
        UpdateNote('');
        if (note !== ''){
          templist.push(note);
          Listupdater(templist);
          tempcoord.push({top:`${Math.random()* 45}em`, left:`${Math.random()* 95}%`});
          updatePos(tempcoord);
          }
          
    }})
  }
  )
  return (
    <div id="webContent">
      <div id="post-widget">
        
          <input type="text" value = {note} onInput={(x) => {UpdateNote(x.target.value)}} ></input>
          <span className='generic-button' 
                onClick={console.log()}>Add</span>
  
      </div>
      <div id="note-mapper">
      <Lupdater lists={templist} positionStates={tempcoord} />
      </div>
      
    </div>
    );
}
const AppBody = ()=>{
  
  //let [state,UpdateState] = useState(["Home",<Home/>]);
  let [state,UpdateState] = useState(["Fun",<Fun/>]);
  
  useEffect(x=>{document.title=state[0]},[state]);
  return (
          <>
            <div id="Nav-bar">
              <ul>
                <li onClick={()=>{UpdateState(["Home",<Home/>])}}>Home</li>
                <li onClick={()=>{UpdateState(["Print Quote",<Quote />])}}>Print Quote</li>
                <li onClick={()=>{UpdateState(["Resume",<Resume/>])}}>Resume</li>
                <li onClick={()=>{UpdateState(["About",<About/>])}}>About</li>
                <li onClick={()=>{UpdateState(["Fun",<Fun/>])}}>Fun</li>
              </ul>
            <SeachBar/>
            </div>
              {state[1]}
          </>
        );
}



export default App;
