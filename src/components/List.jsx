import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Card from './Card';

export default function List(props) {

    const [thisListTitle, setThisListTitle] = useState(props.listTitle)
    const [changeListTitle, setChangeListTitle] = useState(false)
    const [showOptionBox, setShowOptionBox] = useState(false)
    const updateListTitle = () => {
        setChangeListTitle(false)
        if (thisListTitle.length) {
            props.updateListTitle(props.listTitle, thisListTitle)
        }
    }


    return (
        <div className='w-72 p-3 bg-slate-100 rounded-md shrink-0 relative font-karla'>
            <div className='flex justify-between items-start'>
                {
                    changeListTitle ?
                        <ClickAwayListener onClickAway={updateListTitle}>
                            <textarea
                                autoFocus
                                style={{ height: `${((Math.floor(thisListTitle.length / 27) + 1)) * 36}px` }}
                                className='overflow-hidden font-semibold resize-none rounded-md w-56 px-2 outline-none bg-white border-blue-600 border-2'
                                value={thisListTitle} name='thisListTitle'
                                onChange={env => setThisListTitle(env.target.value)}
                            />
                        </ClickAwayListener> :
                        <a href="#" onClick={() => setChangeListTitle(true)} className='grow-0'>
                            <h2 className='font-semibold'>{props.listTitle}</h2>
                        </a>
                }
                <a href='#' onClick={()=>setShowOptionBox(true)} >
                    <MoreHorizIcon />
                </a>
            </div>

            {showOptionBox &&
                <ClickAwayListener onClickAway={() => (setShowOptionBox(false))}>
                    <div className='bg-white shadow-2xl w-52 absolute rounded-md top-3 -right-40 font-karla py-2 z-10'>
                        <h1 className='text-center text-slate-500'>List actions </h1>
                        <hr className='border-2 m-2' />
                        <a href="#" className='px-2 hover:bg-slate-300 block'
                            onClick={() => props.deleteList(props.listTitle)}
                        >Delete list...</a>
                    </div>
                </ClickAwayListener>
            }
        </div>
    )
}