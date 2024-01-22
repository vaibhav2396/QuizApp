export default function Intro(props){
    return  (
        <>
            <div className="intro">
                <h1>Quizzical</h1>
                <p>Trivia Time, Test Mind</p>
                <button onClick={props.startQuiz}>Start quiz</button>
            </div>
        </>
)}