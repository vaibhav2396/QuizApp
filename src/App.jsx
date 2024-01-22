import { useState, useEffect } from 'react'
import './App.css'
import Intro from './components/Intro'
import Trivia from './components/Trivia'

function App() {

  const [page, setPage] = useState("intro")

  function startQuiz(){
    setPage("test")
  }

  return (
      <>
        {page === "intro" && <Intro startQuiz={startQuiz}/>}
        {page === "test" && <Trivia  setPage = {setPage} />}
      </>
  )
}

export default App
