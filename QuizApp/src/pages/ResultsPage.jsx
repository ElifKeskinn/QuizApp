import React from 'react';
import '../styles/resultsPage.css';
const ResultsPage = ({ results, goToStartPage }) => {
  return (
    <div className='resultspage'>
    <div className='left'>
      
    <h1 style={{  marginTop: '30px' }}>Quiz completed</h1>
    <h1 style={{marginTop: '30px'  }}>You scored...</h1>

      </div>

      <div className='right'>
        <div className='resultContainer' >
          <div className='score'>{results.correctAnswers}</div>
          <h6>out of {results.totalQuestions}</h6>

        </div>
        <button className='PlayBtn' onClick={goToStartPage}>Play Again</button>

      </div>
    </div>
  );
};

export default ResultsPage;
