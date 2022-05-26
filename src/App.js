import './App.css';
import './css/bootstrap.css';
import React ,{useState, useEffect, useRef, useCallback} from 'react';
import Notes from './Notes.js';
import Wordle from './Wordle.js';
import Resume from './Resume.js';
import Anime, {anime} from 'react-anime';
let wordleWord = "zamboni";
function App() {
  return (
  <div className='App'>
  <div id="page">
    <header>
      <h1 className="display-4">Emeka Ariwodo</h1>
    </header>
   <AppBody/>
  </div>
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

function About(){
  return (<>
    <h1>About page</h1>
    </>);
}



function AppBody(){
  
  const [pageState,UpdateState] = useState(["Home",<Home/>]);
  
  useEffect(x=>{document.title=pageState[0]},[pageState]);


  return (
          <>
            <div id="Nav-bar">
              <ul  id="Root-List-Items">
                <li onClick={()=>{UpdateState(["Home",<Home/>])}}>Home</li>
                <li onClick={()=>{UpdateState(["Print Quote",<Quote />])}}>Print Quote</li>
                <li onClick={()=>{UpdateState(["Resume",<Resume/>])}}>Resume</li>
                <li onClick={()=>{UpdateState(["About",<About/>])}}>About</li>
                <li
                    className = "Dropdown">Apps
                    <ul>
                    <li onClick={()=>{UpdateState(["Notes",<Notes/>])}}>
                      Notes App
                    </li>
                    <li onClick={()=>UpdateState(['Wordle',<Wordle solution={wordleWord}/>])}>Wordle App</li>
                    </ul>
                </li>
              </ul>
            <SeachBar/>
            </div>
              {pageState[1]}
          </>
        );
}



export default App;
