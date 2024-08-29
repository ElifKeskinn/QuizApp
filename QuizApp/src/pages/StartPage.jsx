import React, { useState } from 'react';

const Header = ({ toggleTheme, goToQuizPage }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleStartQuiz = (topic, imgSrc) => {
    setSelectedTopic(topic);
    setSelectedImg(imgSrc);
    goToQuizPage(topic, imgSrc);
  };
  
  return (
    <div className='StartPage'>
      <div className='leftSide'>
      <h1 className='welcome'>Welcome to the</h1>
      <h1 className='front'>Frontend Quiz!</h1>
      <h4 className='subtitle'>Pick a subject to get started.</h4>
      </div>
      <div className='rightSide'>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div className='topicBtns'>
        <button className='html' onClick={() => handleStartQuiz('html')} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../src/img/html.png" style={{ marginRight: '10px', width: '1.5em', height: '1.5em' }} />HTML</button>
        <button className='css' onClick={() => handleStartQuiz('javascript')} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../src/img/js.png" style={{ marginRight: '10px', width: '1.5em', height: '1.5em' }} />Javascript</button>
        <button className='js' onClick={() => handleStartQuiz('css')} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../src/img/css.png" style={{ marginRight: '10px', width: '1.5em', height: '1.5em' }} />CSS</button>
        <button className='js' onClick={() => handleStartQuiz('accessibility')} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../src/img/acces.png" style={{ marginRight: '10px', width: '1.5em', height: '1.5em' }} />Accessibility</button>
          </div>
      </div>
      
    </div>
  );
};

export default Header;
