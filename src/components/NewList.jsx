import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import ClickAwayListener from '@mui/base/ClickAwayListener'

export default function NewList(props) {
  //to check if user clicked on add list
  const [is_new_list, set_is_new_list] = useState(false)
  
  //after addlist is clicked newlisttitle as an input for new list tile
  const [new_list_title, set_new_list_title] = useState("")
  
  //toggle new list 
  const toggleIsNewList = () => {
    set_is_new_list(prevState => !prevState)
    set_new_list_title("")
  }
  
  //updating new list title on every key stroke
  const addNewListTitle = env => {
    set_new_list_title(env.target.value)
  }

  return (
    <div>
      {!is_new_list ?
        <div
          className='w-72 bg-slate-400 rounded-md p-2 bg-opacity-70 hover:bg-opacity-50'>
          <a href="#" className='text-white' onClick={toggleIsNewList}>
            <AddIcon />
            <span className='font-karla text-base font-semibold'>Add another list</span>
          </a>
        </div> :
        <ClickAwayListener onClickAway={toggleIsNewList}>
          <div className='w-72 bg-slate-100 p-2 rounded-md'>
            <form action="">
              <input
                type="text" placeholder='Enter list title...'
                className='w-full px-2 h-9 outline-none border-blue-600 border-2 rounded-md'
                value={new_list_title} onChange={addNewListTitle} />
            </form>
            <button
              className='bg-blue-600 rounded-md mt-2 px-2 py-1 text-white'
              onClick={() => { props.addNewlistTitle(new_list_title); toggleIsNewList() }}>
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
