import React, { useState, useEffect } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './styles/light-theme.css';
import './styles/dark-theme.css';
import ProgressBar from './components/ProgressBar';
import ThemeToggle from './components/ThemeToggle';

const getThemeFromLocalStorage = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : 'light';
  } catch (error) {
    console.error('Failed to parse theme from localStorage:', error);
    return 'light';
  }
};

const saveThemeToLocalStorage = (theme) => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

const getQuizStateFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('quizState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to parse quiz state from localStorage:', error);
    return null;
  }
};

const saveQuizStateToLocalStorage = (state) => {
  if (state === null) {
    localStorage.removeItem('quizState');
  } else {
    localStorage.setItem('quizState', JSON.stringify(state));
  }
};
const App = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizResults, setQuizResults] = useState({ correctAnswers: 0, totalQuestions: 10 });
  const [isDarkMode, setIsDarkMode] = useState(getThemeFromLocalStorage() === 'dark');
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsLength, setQuestionsLength] = useState(0);
  const [resetFlag, setResetFlag] = useState(false); //currentindexi silemediğim için flag tanımlayarak ile deniycem

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    saveThemeToLocalStorage(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const savedState = getQuizStateFromLocalStorage();
    if (savedState) {
      if (savedState.topic) {
        setCurrentPage('quiz');
        setSelectedTopic(savedState.topic);
        setCurrentQuestionIndex(savedState.currentQuestionIndex || 0);
        setQuestionsLength(savedState.totalQuestions );
        setQuizResults({
          correctAnswers: savedState.correctAnswers,
          totalQuestions: savedState.totalQuestions,
        });
        setProgress(Math.round(((savedState.currentQuestionIndex + 1) / savedState.totalQuestions) * 100));
      } else {
        setCurrentPage('start');
      }
    } else {
      setCurrentPage('start');
    }
  }, []);

  useEffect(() => {
    if (resetFlag) {
      setCurrentQuestionIndex(0);
      setQuestionsLength(0);
      saveQuizStateToLocalStorage(null);
      setResetFlag(false); 
    }
  }, [resetFlag]);

  const updateProgress = (index, length) => {
    setCurrentQuestionIndex(index);
    setQuestionsLength(length);
    const calculatedProgress = Math.round(((index + 1) / length) * 100);
    setProgress(calculatedProgress);
    saveQuizStateToLocalStorage({
      topic: selectedTopic,
      currentQuestionIndex: index,
      correctAnswers: quizResults.correctAnswers,
      totalQuestions: length,
    });
  };

  const goToQuizPage = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage('quiz');
  };

  const goToResultsPage = (results) => {
    setQuizResults(results);
    setCurrentPage('results');
    setSelectedTopic(null);
    setResetFlag(true); 
  };


  const goToStartPage = () => {
    setCurrentPage('start');
    setSelectedTopic(null);
    console.log(' start Clearing quiz state from localStorage');
    saveQuizStateToLocalStorage(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
      {currentPage === 'start' && <StartPage goToQuizPage={goToQuizPage} />}
      {currentPage === 'quiz' && selectedTopic && (
        <QuizPage
          topic={selectedTopic}
          goToResultsPage={goToResultsPage}
          onProgressUpdate={updateProgress}
          initialQuestionIndex={currentQuestionIndex} 
        />
      )}
      {currentPage === 'results' && <ResultsPage results={quizResults} goToStartPage={goToStartPage} />}
      <ProgressBar progress={progress} />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default App;
