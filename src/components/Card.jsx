import React, { useEffect, useMemo, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';

export default function Card(props) {
  const [is_card_hover, set_is_cad_hover] = useState(false)
  useEffect(() => {
    let el = document.getElementById(`${props.cardId}${props.parentId}`)
    function cardHoverHandler() {
      set_is_cad_hover(prevState => !prevState)
    }
    if (el) {
      el.addEventListener('mouseover', cardHoverHandler)
      el.addEventListener('mouseout', cardHoverHandler)
    }
    return () => {
      el.removeEventListener('mouseover', cardHoverHandler)
      el.removeEventListener('mouseout', cardHoverHandler)
    }
  },[])
  return (
    <div
      id={`${props.cardId}${props.parentId}`}
      className='bg-white font-karla rounded-md shadow-md my-3 hover:bg-slate-300 relative'>
      <h2 className='font-karla p-2'>{props.cardData}</h2>
      {is_card_hover &&
        <a href="#" className='absolute top-1 right-1'><EditIcon style={{color:'gray'}}/></a>
      }
    </div>
  )
}
