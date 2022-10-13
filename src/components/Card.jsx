import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { cardUpdateContext } from './Context'

export default function Card(props) {

  const updateCardData = useContext(cardUpdateContext)

  const [thisCardData, setThisCardData] = useState(props.cardData)

  const [isCardHOver, setIsCardHover] = useState(false)

  const [isChangeData, setIsChangeData] = useState(false)

  useEffect(() => {

    const cardElement = document.getElementById(`${props.parentTitle}${props.cardId}`)
    cardElement.classList.add('card')
    function dragStart() {
      event.preventDefault();
      event.stopPropagation();
    }
    if (cardElement) {
      cardElement.addEventListener('dragstart', dragStart)
      cardElement.addEventListener('mouseover', () => setIsCardHover(true))
      cardElement.addEventListener('mouseout', () => setIsCardHover(false))
    }

    return () => {
      cardElement.removeEventListener('mouseover', () => setIsCardHover(true))
      cardElement.removeEventListener('mouseout', () => setIsCardHover(false))
    }

  }, [])

  return (
    <div
      id={`${props.parentTitle}${props.cardId}`}
      className='bg-white font-karla rounded-md shadow-md my-3 hover:bg-slate-300 relative'
      draggable={!isChangeData}>

      <h2 className='font-karla p-2'>{props.cardData}</h2>

      {isCardHOver
        && <a href="#" className='absolute top-0 right-0.5' onClick={() => setIsChangeData(true)}>
          <EditIcon style={{ color: 'gray' }} sx={{ fontSize: 20 }} /></a>
      }

      {isChangeData
        && <ClickAwayListener onClickAway={() => { setIsChangeData(false); setThisCardData(props.cardData) }}>

          <div className='absolute top-0 z-10 w-full h-20'>

            <textarea
              autoFocus
              className='resize-none rounded-md w-full h-full bg-slate-200 p-2 focus:outline-none text-black border-2 border-blue-600'
              value={thisCardData} onChange={env => setThisCardData(env.target.value)}>
            </textarea>

            <button
              onClick={() => {
                thisCardData.length
                  ? updateCardData(props.parentTitle, props.cardId, thisCardData)
                  : undefined
                  ; setIsChangeData(false)
                  ; setIsCardHover(false)
              }}
              className='bg-blue-600 rounded-md mt-2 px-3 py-1 text-white'>
              Save
            </button>

          </div>

        </ClickAwayListener>
      }

    </div>
  )
}
