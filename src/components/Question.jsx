import { useEffect, useState } from "react";
import Answers from "./Answers";

export default function Question(props){
    function selectAns(e){
        props.updateAnswer(props.quesIndex, e.target.innerText )
    }

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