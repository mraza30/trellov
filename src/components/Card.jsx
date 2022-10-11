import React, { useEffect, useMemo, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import ClickAwayListener from '@mui/base/ClickAwayListener';
export default function Card(props) {
  const [is_card_hover, set_is_card_hover] = useState(false)
  const [card_data, set_card_data] = useState(props.cardData)
  const [is_change_data, set_is_change_data] = useState(false)
  useEffect(() => {
    let el = document.getElementById(`${props.cardId}${props.parentId}`)
    if (el) {
      el.addEventListener('pointerenter', () => set_is_card_hover(true))
      el.addEventListener('pointerleave', () => set_is_card_hover(false))
    }
    return () => {
      el.removeEventListener('mouseover', () => set_is_card_hover(true))
      el.removeEventListener('mouseout', () => set_is_card_hover(false))
    }
  }, [])
  return (
    <div
      id={`${props.cardId}${props.parentId}`}
      className='bg-white font-karla rounded-md shadow-md my-3 hover:bg-slate-300 relative'
      draggable='true'>
      <h2 className='font-karla p-2'>{props.cardData}</h2>
      {is_card_hover &&
        <a href="#" className='absolute top-1 right-1' onClick={() => set_is_change_data(true)}>
          <EditIcon style={{ color: 'gray' }} /></a>
      }
      {
        is_change_data &&
        <ClickAwayListener onClickAway={() => set_is_change_data(false)}>
          <div className='absolute top-0 z-10 w-full h-20'>
            <textarea
              autoFocus
              className='resize-none rounded-md w-full h-full bg-slate-200 p-2 focus:outline-none text-black border-2 border-blue-600'
              value={card_data} onChange={env => set_card_data(env.target.value)}>
            </textarea>
            <button
              onClick={() => { card_data.length ? props.updateCardData(props.parentId, props.cardId, card_data) : undefined; set_is_change_data(false); set_is_card_hover(false) }}
              className='bg-blue-600 rounded-md mt-2 px-3 py-1 text-white'>
              Save
            </button>
          </div>
        </ClickAwayListener>
      }
    </div>
  )
}
