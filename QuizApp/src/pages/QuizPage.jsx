import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import '../styles/quizPage.css';
import htmlImg from '../img/html.png';
import cssImg from '../img/css.png';
import accesImg from '../img/acces.png';
import jsImg from '../img/js.png';

const getImageForTopic = (topic) => {
  if (!topic) return null;

  switch (topic.toLowerCase()) {
    case 'html':
      return htmlImg;
    case 'css':
      return cssImg;
    case 'acces':
      return accesImg;
    case 'javascript':
      return jsImg;
    default:
      return null;
  }
};

const QuizPage = ({ topic, goToResultsPage, onProgressUpdate, initialQuestionIndex = 0 }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/assets/questions/${topic}.json`)
      .then(response => {
        if (response.ok) {
          console.log(topic);
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        setQuestions(data.questions);
        setLoading(false);
        onProgressUpdate(currentQuestionIndex, data.questions.length);
      })
      .catch(error => {
        setError(`Fetch error: ${error.message}`);
        setLoading(false);
      });
  }, [topic, onProgressUpdate, currentQuestionIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      onProgressUpdate(currentQuestionIndex, questions.length);
    }
  }, [currentQuestionIndex, questions.length, onProgressUpdate]);

  const TopicComponent = ({ topic }) => {
    const imageSrc = getImageForTopic(topic);
    return (
      <div className="selected-topic">
        {imageSrc && <img src={imageSrc} alt={topic} className="topic-image" />}
        <h2>{topic}</h2>
      </div>
    );
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    setIsSubmitted(true);

    const question = questions[currentQuestionIndex];
    
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === question.answer;

    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsSubmitted(false);
      } else {
        goToResultsPage({ correctAnswers: correctAnswersCount, totalQuestions: questions.length });
      }
      onProgressUpdate(currentQuestionIndex, questions.length);
    }, 1000);
  };

  const question = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <div className="selected-topic">
        <TopicComponent topic={topic} />
      </div>
      {question ? (
        <Question
          question={question}
          onAnswerSelect={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
          onSubmitAnswer={handleSubmitAnswer}
          isSubmitted={isSubmitted}
        />
      ) : (
        <div>Loading question...</div>
      )}
    </div>
  );
};

export default QuizPage;
