
import { useRef, useState } from "react";
import {data} from "../assets/data";



export default function Quiz(){
  let[index, setIndex] = useState(0);
  const[question, setQuestion] = useState(data[index]);
  const[lock, setLock] = useState(false);
  const[score, setScore] = useState(0); 
  let[result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1,option2,option3,option4];

 
  const checkAns = (e, ans) => {
    if(lock === false){
      if(question.ans === ans){
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      }
      else{
        e.target.classList.add('wrong');
        setLock(true);
         option_array[question.ans-1].current.classList.add("correct");
      }
      }
  }

  function next(){
    if(lock === true){
      if(index === data.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      })
    }

  }

 const reset = () => {
     setIndex(0);
     setQuestion(data[0]);
     setScore(0);
     setLock(false);
     setResult(false);
 }
    return(
       
        <>
        <div className="container">
   
        {result?<></> : <>
       
        <h2> {index+1} . {question.question}</h2>

        <ul >
            <li ref={option1} onClick={(e) => {checkAns(e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e) => {checkAns(e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e) => {checkAns(e,3)}}>{question.option3}</li>
            <li ref={option4} onClick={(e) => {checkAns(e,4)}}>{question.option4}</li>
          </ul>
          <button onClick={next}>NEXT</button>
          <div className="index">{index+1} of {data.length} questions</div>
        
        </>}
         {result?<><h2 className="box">You scored {score} out of {data.length}</h2>
        <div className="store">
        <button onClick={reset}>Reset</button>
        </div> </> : <></>}
          
        </div>
        </>
    )
} 