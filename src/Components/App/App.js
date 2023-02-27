import './App.css';
import React, { useState, useEffect } from 'react'
import Header from '../Header/Header';
import hmpic0 from '../../assets/hmpic0.png'
import hmpic1 from '../../assets/hmpic1.png'
import hmpic2 from '../../assets/hmpic2.png'
import hmpic3 from '../../assets/hmpic3.png'
import hmpic4 from '../../assets/hmpic4.png'
import hmpic5 from '../../assets/hmpic5.png'
import hmpic6 from '../../assets/hmpic6.png'
import { alphabet, wordbase, boxbase } from '../../assets/wordbase';

function App() {
  const [wordArray, setWordArray] = useState(['a', 'b'])
  const [mistakeCounter, setMistakeCounter] = useState(0)
  const [remaining, setRemaining] = useState(['a', 'b'])
  const [boxState, setBoxState] = useState(boxbase)
  const [messageState, setMessageState] = useState(['inv-box', 'inv-message', ''])
  const picStorage = [hmpic0, hmpic1, hmpic2, hmpic3, hmpic4, hmpic5, hmpic6]

  const makeRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length)
  }

  const setupGame = () => {
    const currentWord = wordbase[makeRandomIndex(wordbase)]
    setWordArray(currentWord.split(''))
    setBoxState(boxbase)
    setMistakeCounter(0)
    setRemaining(currentWord.split(''))
    setMessageState(['inv-box', 'inv-message', ''])
  }

  useEffect(() => {
    setupGame()
  }, [])

  const toggleBox = (letter) => {
    if(mistakeCounter < 6 && remaining.length > 0){
      setBoxState({...boxState, [letter + 'Box']: ['vis', '#c23737']})
      setRemaining(remaining.filter(ltr => ltr !== letter))
      const occurances = wordArray.filter(ltr => ltr === letter)
      if(occurances.length === 0) {
        setMistakeCounter(mistakeCounter + 1)
      }
    }
    if(mistakeCounter >= 6 || remaining.length === 0){
      setupGame()
    }
  }

  useEffect(() => {
    if(mistakeCounter === 6 && remaining.length > 0) {
      setMessageState(['lose-box', 'lose-message', 'you lose.'])
    }
    if(remaining.length === 0) {
      setMessageState(['win-box', 'win-message', 'you win.'])
    }
  }, [remaining, mistakeCounter])

  return (
    <div className='App'>
      <Header />
      <div className='app-main'>
        <div className='main-left'>
          <div className='left-top'>
            <button className='reset-button' onClick={() => setupGame()}>new word.</button>
            <div className='word-container'>
              {wordArray.map(letter => {
                return (
                  <div className={boxState[letter + 'Box'][0]}>
                    <p className='word-letter' id={letter}>{letter}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='left-bottom'>
            {alphabet.map(letter => {
              return (
                <button className='letter' id={letter} onClick={() => toggleBox(letter)} style={{backgroundColor: boxState[letter + 'Box'][1]}} >{letter}</button>
              )
            })}
          </div>
        </div>
        <div className='main-right'>
        <img src={picStorage[mistakeCounter]} className='figure' alt='hangman-figure' />
        <p className='mistake-counter'>mistakes: {mistakeCounter}</p>
        <p className='remaining'>remaining letters: {remaining.length}</p>
        </div>
      </div>
      <div className={messageState[0]}>
        <p className={messageState[1]}>{messageState[2]}</p>
      </div>
    </div>
  );
}

export default App;
