import React from 'react'
import './component2.css'
import {BsCalendar} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

function Component2({title, description, start, end, image, id}) {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(`/code/${id}/0`)
  }

  return (
    <div className='home-component2-wrapper' onClick = {handleClick}>
      <div className='contest-details'>
        <div className='title'>{title}</div>
        <div className='contest-desc'>
          <p className='desc-child'>{description}</p></div>
        <div className='date'><BsCalendar className='calendar'></BsCalendar>{start} -  {end}</div>
      </div>
      <div className='inner'>
        <div className='contest-image'>
          <img className='image' alt='Image here' src={image? image: 'https://c4.wallpaperflare.com/wallpaper/513/91/777/cool-technology-code-wallpaper-preview.jpg'} />
        </div>
      </div>
      <hr className='desc-line' />
    </div>
  )
}

export default Component2