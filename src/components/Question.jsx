import { useState } from 'react';

import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js';

export default function Question({
    index,
    onSelectAnswer,
    onSkipAnswer,
  }) {
     // State to manage the selected answer and correctness status
    const [answer, setAnswer] = useState({
      selectedAnswer: '',
      isCorrect: null
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
      timer = 1000;
    }
  
    
    if (answer.isCorrect !== null) {
      timer = 2000;
    }
    
    // Function to handle answer selection
    function handleSelectAnswer(answer) {
        // Update the answer state with the selected answer
      setAnswer({
        selectedAnswer: answer,
        isCorrect: null
      })
      
      // After a delay of 1 second, check if the answer is correct
      setTimeout(() => {
        setAnswer({
          selectedAnswer: answer,
          isCorrect: QUESTIONS[index].answers[0] === answer // Assuming the first answer in the list is correct
        })
        // After an additional delay of 2 seconds, call the onSelectAnswer function
        setTimeout(() => {
          onSelectAnswer(answer);
        }, 2000);
      }, 1000);
    }
    
    // Determine the state of the answer (answered, correct, or wrong)
    let answerState = '';
  
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        // If an answer is selected and its correctness is determined
      answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        // If an answer is selected but its correctness is not yet determined
      answerState = 'answered';
    }
  
    return (
      <div id="question">
       <QuestionTimer
                
            timeout={timer}
            onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
            mode={answerState}
      />
        <h2>{QUESTIONS[index].text}</h2>
        <Answers
          answers={QUESTIONS[index].answers} // List of possible answers
          selectedAnswer={answer.selectedAnswer} // The currently selected answer
          answerState={answerState} // The state of the selected answer
          onSelect={handleSelectAnswer} // Function to call when an answer is selected
        />
      </div>
    );
}  