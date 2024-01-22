import { nanoid } from 'nanoid'
import { decode } from "html-entities"

export default function Answers(props){
    
    return props.answers.map(answer =>{
        let classes=[]
        if(props.isAllAnswered){
            answer === props.correctAnswer? classes.push('correct') : null
        }
        if(answer === props.markedAnswers[props.quesIndex]){
            if(props.isAllAnswered){
                answer === props.correctAnswer ? classes.push('correct') : classes.push('incorrect disable')
            } else{
                classes.push('select')
            }       
        } 
        const id = nanoid()
        return ( 
            <button key={id} 
                className={`answer ` + classes.join(' ')} 
                onClick={(e)=> props.selectAns(e, props.quesIndex)}
                disabled={props.isAllAnswered}
            >
                {decode(answer)}
            </button>
            )
    })
}