
import QUESTION from '../question.js'
import { useState } from 'react'
import QuestionTimer from './QuestionTimer.jsx';

import quizComplateImg from '../assets/quiz-complete.png'
export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswer.length;

   

    const quizComplate = activeQuestionIndex === QUESTION.length;
    function handleSelectAnswer(userAnswer) { 
        setUserAnswer((prev)=> {
            return [...prev, userAnswer];
        })
    }

    if (quizComplate) {
        return (
            <div id="summary">
                <img src={quizComplateImg} alt='QuizComplate'/>
                <h2>Quiz Complate!</h2>
            </div>
        )
    }

    const shuffleAnswer = QUESTION[activeQuestionIndex].answers;
    shuffleAnswer.sort(() => Math.random() - 0.5);
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeOut={()=> handleSelectAnswer(null)} />
                <h2>{QUESTION[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffleAnswer.map((answer) => (
                        <li key={answer} className='answer' >
                            <button onClick={()=> handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}