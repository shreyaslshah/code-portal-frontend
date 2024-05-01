import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate, useLocation } from 'react-router-dom';


function Problems({ questions }) {
  const navigate = useNavigate();
  const location = useLocation();

  function slideOut() {
    var element = document.querySelector('.problems-sidebar');
    element.classList.remove('show');
  }

  function handleClick(id){
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/');
    pathSegments[pathSegments.length - 1] = id;
    const newPath = pathSegments.join('/');
    navigate(newPath);
    var element = document.querySelector('.problems-sidebar');
    element.classList.remove('show');
  }

  return (
    <div className='problems-sidebar'>
      <RxCross2 className='cross' onClick={slideOut}></RxCross2>

      {
        questions.map((question, id) => {
          return (
            <div className="question" onClick={()=>handleClick(id)}>
              <div className="title">{id + 1}. {question.title}</div>
              <span className="score">points: {question.points}</span>
              <span className="diff">{question.difficulty}</span>
              <hr className='problems-line' />
            </div>
          )
        })
      }
    </div>
  )
}

export default Problems