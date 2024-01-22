import { useEffect, useState } from "react";
import Answers from "./Answers";

export default function Question(props){
    let answers
    function selectAns(e){
        props.updateAnswer(props.quesIndex, e.target.innerText )
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
    useEffect(()=>{
        answers = shuffleArray(props.answers)
    },[])
 
    return(
        <>
            <div id={props.id} className="question">
                <h2>{props.ques}</h2>
                <div className="answers">
                    <Answers 
                        answers={props.answers} 
                        correctAnswer={props.correctAnswer}
                        quesIndex={props.quesIndex}
                        selectAns={selectAns}
                        markedAnswers={props.markedAnswers}
                        isAllAnswered = {props.isAllAnswered}
                    />
                </div>
                <hr/>   
            </div> 
        </>
    )
}