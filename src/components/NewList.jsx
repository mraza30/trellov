import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import ClickAwayListener from '@mui/base/ClickAwayListener'

export default function NewList(props) {

  const [makeNewList, setMakeNewList] = useState(false)

  const [newListTitle, setNewListTitle] = useState("")


  const toggleIsNewList = () => {
    setMakeNewList(prevState => !prevState)
    setNewListTitle("")
  }


  return (
    <div className='font-karla'>
      {!makeNewList ?
        <div className='w-72 bg-slate-400 rounded-md p-2 bg-opacity-70 hover:bg-opacity-50'>
          <a href="#" className='text-white' onClick={toggleIsNewList}>
            <AddIcon />
            <span className='font-semibold'>
              Add another list
            </span>
          </a>
        </div> :
        <ClickAwayListener onClickAway={toggleIsNewList}>
          <div className='w-72 bg-slate-100 p-2 rounded-md fadeIn'>
            <input
              autoFocus
              type="text" placeholder='Enter list title...'
              className='w-full px-2 h-9 outline-none border-blue-600 border-2 rounded-md'
              value={newListTitle} onChange={env => setNewListTitle(env.target.value)} />

            <button
              className='bg-blue-600 rounded-md mt-2 px-2 py-1 text-white'
              onClick={() => { props.addNewList(newListTitle); toggleIsNewList() }}>
              Add list
            </button>
            <a href="#" onClick={toggleIsNewList}>
              <CloseIcon style={{ color: 'rgb(37 99 235)', marginLeft: '7px' }} />
            </a>
          </div>
        </ClickAwayListener>
      }
    </div>
  )
}
