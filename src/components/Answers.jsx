import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,  // The state of the selected answer ('answered', 'correct', 'wrong', or '')
  onSelect,  // Function to call when an answer is selected
}) {
      // useRef to hold the shuffled answers, keeping the same shuffled order between renders
  const shuffledAnswers = useRef();
      // Shuffle the answers only once, when the component mounts
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

    
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;  // Check if this answer is the selected one
        let cssClass = '';

        // If the answer state is 'answered' and this answer is selected
        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClass = answerState; // Apply 'correct' or 'wrong' CSS class
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''} // Disable button if answerState is not empty> to prevent the user from changing their answer once an answer has been selected or the question has been skipped.
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/*
Logic
When answerState is an empty string (''):

The condition answerState !== '' evaluates to false.
The disabled attribute is set to false, so the button is enabled.
This means that the user can click the button to select an answer.
When answerState is any other value ('answered', 'correct', or 'wrong'):

The condition answerState !== '' evaluates to true.
The disabled attribute is set to true, so the button is disabled.
This means that the user cannot click the button to select an answer, 
as the answer has already been selected and the question is in a state of being processed or completed.

*/