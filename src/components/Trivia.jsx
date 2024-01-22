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
            .then( data => {
                setQues(() => {
                    return data.results.map(item=>{
                        return {
                            id: nanoid(),
                            ques: decode(item.question),
                            answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
                            correctAnswer: decode(item.correct_answer)
                        }
                    })
                })
            })
    },[])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

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
            if(question.correctAnswer === markedAnswers[index]){
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
            return <Question
                        key = {question.id}
                        ques={question.ques}
                        answers = {question.answers}
                        updateAnswer = {updateAnswer}
                        quesIndex = {index}
                        markedAnswers = {markedAnswers}
                        isAllAnswered = {isAllAnswered}
                        correctAnswer = {question.correctAnswer}
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