import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import { decode } from "html-entities"
import Question from "./Question"
export default function Trivia(props){

    const [markedAnswers, setMarkedAnswers] = useState([])
    const [isAllAnswered, setIsAllAnswered] = useState(false)
    const [ques, setQues] = useState(null)

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5")
            .then( res => res.json())
            .then( data => {setQues(data.results)})
    },[])

    function updateAnswer(index, selectedAns){
        setMarkedAnswers(oldAnswers => {
            let newAns = [...oldAnswers]
            newAns[index] = selectedAns
            return newAns
        })
    }
    
    function chkAns(){
        if(markedAnswers.length === ques.length){
            setIsAllAnswered(true)
        }
    }

    function count(){
        let count = 0
        ques.map((question, index) => {
            if(question.correct_answer === markedAnswers[index]){
                count++
            }
        })
        return count
    }
    
    function playAgain(){
        props.setPage("intro")
    }

    function getQuestionEl(){ 
        return ques.map((question, index) => {
            const id = nanoid()
            return <Question
                        key = {id}
                        id = {id} 
                        ques={decode(question.question)}
                        answers = {[...question.incorrect_answers, question.correct_answer]}
                        updateAnswer = {updateAnswer}
                        quesIndex = {index}
                        markedAnswers = {markedAnswers}
                        isAllAnswered = {isAllAnswered}
                        correctAnswer = {decode(question.correct_answer)}
                    />
        })
    }
    
       
    return(
        <div className="questions">
            
            {ques? getQuestionEl() : <p className="loading">Loading ...</p> }
            <p className="result">
                {isAllAnswered? `You scored ${count()}/${ques.length} correct answers`: ``}
            </p>
            <div className="btn-play">
                {   ques && 
                    <button className="btn-chk-ans" 
                        onClick={ !isAllAnswered? chkAns: playAgain }>{!isAllAnswered? "Check answers" : "Play again"}
                    </button>
                }
            </div>
        </div>
    )
}