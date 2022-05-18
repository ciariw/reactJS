import './App.css';
import './css/bootstrap.css';
import React ,{useState, useEffect, useRef} from 'react';
import Notes from './Notes.js'

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



const AppBody = ()=>{
  
  //let [state,UpdateState] = useState(["Home",<Home/>]);
  let [state,UpdateState] = useState(["Home",<Home/>]);
  
  useEffect(x=>{document.title=state[0]},[state]);
  return (
          <>
            <div id="Nav-bar">
              <ul  id="Root-List-Items">
                <li onClick={()=>{UpdateState(["Home",<Home/>])}}>Home</li>
                <li onClick={()=>{UpdateState(["Print Quote",<Quote />])}}>Print Quote</li>
                <li onClick={()=>{UpdateState(["Resume",<Resume/>])}}>Resume</li>
                <li onClick={()=>{UpdateState(["About",<About/>])}}>About</li>
                <li 
                    onMouseOver={()=>console.log('wow, mouse over.')}
                    className = "Dropdown">Apps
                    <ul>
                    <li onClick={()=>{UpdateState(["Notes",<Notes/>])}}>
                      Notes App
                    </li>
                    <li>Wordle App</li>
                    </ul>
                </li>
              </ul>
            <SeachBar/>
            </div>
              {state[1]}
          </>
        );
}



export default App;
