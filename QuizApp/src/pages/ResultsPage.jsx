import React from 'react';
import '../styles/resultsPage.css';
const ResultsPage = ({ results, goToStartPage }) => {
  return (
    <div className='resultspage'>
    <div className='left'>
      
    <h1 style={{  marginTop: '30px' }}>Sınav tamamlandı..</h1>
    <h1 style={{marginTop: '30px'  }}>Skorunuz...</h1>

      </div>

      <div className='right'>
        <div className='resultContainer' >
          <div className='score'>{results.correctAnswers}</div>
          <h6>toplam soru {results.totalQuestions}</h6>

        </div>
        <button className='PlayBtn' onClick={goToStartPage}>Tekrar dene</button>

      </div>
    </div>
  );
};

export default ResultsPage;
