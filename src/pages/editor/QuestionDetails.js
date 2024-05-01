import React from 'react'
import './editor.css'
function QuestionDetails({questionNo, details, userPoints}) {
  return (
    <div className='left'>
        <div className="title">{questionNo}. {details.title}</div>
        <div className='details'>
          <span className='difficulty'>{details.difficulty}</span>
          <span className='score'>Max Points: {details.points}</span>
          <span className='score'>Your Points: {userPoints}</span>
        </div>
        <div className="description">
          {details.description}
        </div>
        <div className='sample'>Sample Example : </div>
        <div className='sample-desc'>
          <div className='input'>Input : {details.sampleInput}</div>
          <div className='output'>Output : {details.sampleOutput}</div>
        </div>
    </div>
  )
}

export default QuestionDetails