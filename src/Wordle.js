import React,{useRef,useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';

let letty = new Array(35).fill('');
let letterhash = new Object();
let keyboardletters = new Array(26).fill(" ");




function DisplayGuesses(props){
    
    const answer = props.list.map((content,identifier)=><div className="guess-item" id={`wordlebox${identifier}`} key={identifier}>{content}</div>);
    
    return answer;
}// Wordle main body

function validate(answer,solution,args){
    
    // creates a new set every time this is called. needs optimizing 
    //console.log(args[1]);
    //hashmaps are super useful for this. I will change it later to reduce the amount of loops
    
    let forGrey = [];
    let forGreen = [];
    let tmpobj = JSON.parse(JSON.stringify(args[1]));
    let listofElements = [];
    for (let [ind,i] of answer.entries()){
        let temp = document.getElementById(`wordlebox${ind+args[0]}`);
        listofElements[ind]=temp;
    }
    //get greens > get greys. If the 
    
    for (let [index,element] of answer.entries()){
        element = element.toUpperCase()
        
        if (listofElements[index].textContent == solution[index].toUpperCase()){
            // if the text of the item
            //mark this letter for green
            forGreen.push([index,element]);
            listofElements[index].style.backgroundColor ="Green";
            tmpobj[element]-=1
            if (tmpobj[element]<1){
                delete tmpobj[element];
                // skips if there is a grey in there
            }
        }else{
            // if the element and letter dont match but you see that the letter exists, 
            // mark the letter for greying

            if(tmpobj.hasOwnProperty(element)){

                if (tmpobj[element] > 0){

                    forGrey.push([index,element]);
                }
            }
            
        }

        //got all the green. Need to loop through the grey and delete letters in there
        
    }
    for(let [index,element] of forGrey){
        // if this letter has at least one letter slot remaining, grey it out. If not, skip
        if (tmpobj[element]>0){
            listofElements[index].style.backgroundColor="Gray";
            tmpobj[element]-=1;
        }
    }
}

function Keyboard(props){


    let tex = keyboardletters.map((value,index)=><div className='keyboard-button' key={`keyboard${index}`}><p>{value}</p></div>);
    return <div id="keyboard" style={{display:'flex', flexWrap:'wrap',width:'100%',padding:"0 20em", justifyContent:'center'}}>{tex}</div>
}

function Wordle(props){
    let [index,setIndex] = useState(0);
    let [continuity,setcontinuity] = useState(true);
    let [nextLine,setNextLine] = useState(false);
    let [tempdata,settempdata] = useState([]);
    useEffect(()=>{
        for(let [index,letter] of keyboardletters.entries()){
            keyboardletters[index] = String.fromCharCode(65+index);
        }
    },[])
    useEffect(()=>{
        for(let i of props.solution.toUpperCase()){
            if(letterhash.hasOwnProperty(i)){
                letterhash[i]+=1;
            }else{
                letterhash[i] = 1;
            }
        }
    },[]);
    console.log(tempdata)
    window.addEventListener('keydown',e=>{
        
        if (!e.key.match(/[a-z]/i)){
            //exit if the input isnt a letter
            setcontinuity(!continuity);
            return;
        }
        if (index == letty.length){
            //exit if we are at the end after validating
            validate(letty.slice(index-7,index),props.solution,[index-7,letterhash]);
            return;
        }
        //console.log(index-1%7)
        if (e.key == 'Backspace'){
            // If you hit bac   kspace, if you are at index 8, dont do anything, go back
            console.log(tempdata.length)
            if (tempdata.length > 0){
                letty[index-1] = '';
                setIndex(index-1);
                tempdata.pop();
                settempdata(tempdata);
                
                return;
            }
            setcontinuity(!continuity);
        }

        if (index > 0 && index%7 == 0){
            console.log('inhere')
            // If you reach the end of a line, and we havent given permission to proceed yet
            if (e.key == 'Enter'){
                validate(letty.slice(index-7,index),props.solution,[index-7,letterhash]);
                settempdata([])
                return;
                // if i hit enter, we skip this
            }
        }
        
        // if i hit enter, it allows for us to go to the next line. 
        // Every char i enter sets nextline to false by default
        console.log(e.key)
        if (e.key.length == 1 && tempdata.length != 7){
            setIndex(index+1)
            tempdata.push(0);
            console.log(tempdata)
            settempdata(tempdata);
            letty[index] = e.key.toUpperCase();
            setNextLine(false)
        }else{
            setcontinuity(!continuity);
        }
        setcontinuity(!continuity);
    },{once:true});

    return (<>
                <div id="wordle-body">
                <DisplayGuesses list = {letty} solution = {props.solution} solhash={letterhash}/>
                </div> 

                <Keyboard/>
            </>
            );
}

export default Wordle;