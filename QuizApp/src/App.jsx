import React, { useState, useEffect } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './styles/light-theme.css'; 
import './styles/dark-theme.css';
import ProgressBar from './components/ProgressBar';

const App = ({}) => {
  const [currentPage, setCurrentPage] = useState('start'); 
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizResults, setQuizResults] = useState({ correctAnswers: 0, totalQuestions: 10 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsLength, setQuestionsLength] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  

  const updateProgress = (index, length) => {
    setCurrentQuestionIndex(index);
    setQuestionsLength(length);
    const calculatedProgress = Math.round(((index + 1) / length) * 100);
    setProgress(calculatedProgress);
  };

  const goToQuizPage = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage('quiz');
  };

  const goToResultsPage = (results) => {
    setQuizResults(results);
    setCurrentPage('results');
  };

  const goToStartPage = () => {
    setCurrentPage('start');
    setSelectedTopic(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
      {currentPage === 'start' && <StartPage goToQuizPage={goToQuizPage} toggleTheme={toggleTheme} />}
      {currentPage === 'quiz' && 
        <QuizPage 
          topic={selectedTopic} 
          goToResultsPage={goToResultsPage} 
          onProgressUpdate={updateProgress} 
        />}
      {currentPage === 'results' && <ResultsPage results={quizResults} goToStartPage={goToStartPage} />}
      <ProgressBar progress={progress} />
    </div>
  );
};

export default App;
