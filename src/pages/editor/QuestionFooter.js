import React from 'react'
import './editor.css'
import { AiOutlineUnorderedList, AiOutlineTrophy } from 'react-icons/ai'
import { BsCodeSlash } from 'react-icons/bs'
import SelectLang from './SelectLang'

function QuestionFooter({lang, setLang,status, onSubmit}) {

  function slideIn() {
    var element = document.querySelector('.problems-sidebar');
    element.classList.add('show');
  }

  function showLeaderboard(){
    document.querySelector('.leaderboard-popup').classList.remove('hide');
  }

  return (
    <div className='foot'>
      <div className='child1'>
        <div className='problems' onClick={slideIn}><AiOutlineUnorderedList className='list' />Problems</div>
        <div className='leaderboard' onClick={showLeaderboard}><AiOutlineTrophy className='list' />Leaderboard</div>
      </div>
      <div className='child2'>
        <SelectLang lang={lang} setLang={setLang}></SelectLang>
        <div className='status'> Status : <span className='status-deets'>{status}</span></div>
        <div className='submit' onClick={onSubmit}><BsCodeSlash className='code' />Submit</div>
      </div>
    </div>
  )
}

export default QuestionFooter