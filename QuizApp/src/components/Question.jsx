import React from 'react';

const Question = ({ question, onAnswerSelect, selectedAnswer, onSubmitAnswer, isSubmitted }) => {


  return (
    <div className="question">
      <h2>{question.question}</h2>
      <div className='options'>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            style={{
              border: isSubmitted ?
                (option === question.answer ? '2px solid green' : '2px solid red') :
                (selectedAnswer === option ? '3px solid #A729F5' : '1px solid #3e3d3d ')
            }}
          >
            <div className="option-container">
              <span className="option-label">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </div>

          </button>
        ))}
        <button
          onClick={onSubmitAnswer}
          className="submit-button"

        >
          Cevapla      </button>
      </div>

    </div>
  );
};

export default Question;
