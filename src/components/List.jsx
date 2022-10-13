import React, { useEffect, useRef, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Card from './Card';

export default function List(props) {

    const [thisListTitle, setThisListTitle] = useState(props.listTitle)

    const [changeListTitle, setChangeListTitle] = useState(false)

    const [showOptionBox, setShowOptionBox] = useState(false)

    const [addNewCard, setAddNewCard] = useState(false)

    const [newCardData, setNewCardData] = useState('')

    const updateListTitle = () => {

        setChangeListTitle(false)

        if (thisListTitle.length) {
            props.updateListTitle(props.listTitle, thisListTitle)
        }
    }


    const initialDrag = useRef({ top: 0, left: 0 })

    const whenDragStart = env => {
        initialDrag.current.top = env.pageY
        initialDrag.current.left = env.pageX
        env.currentTarget.classList.add('dragging')
        const dragIcon = document.createElement('img');
        env.dataTransfer.setDragImage(dragIcon, 0, 0);
    }

    const whenDragging = env => {

        env.currentTarget.style.left = ((env.pageX - initialDrag.current.left)) + 'px'
        env.currentTarget.style.top = ((env.pageY - initialDrag.current.top)) + 'px'
    }

    const whenDragEnd = env => {
        env.currentTarget.classList.remove('dragging')
        env.currentTarget.style.top = 0 + 'px'
        env.currentTarget.style.left = 0 + 'px'
    }
    //event.target.classList.contains('box1')
    const whenDragEnter = env => {

    }

    const whenDragLeave = env => {

    }

    const whenTouchStart = env => {
        if (!env.target.closest('.card')) {
            initialDrag.current.top = env.touches[0].screenY
            initialDrag.current.left = env.touches[0].screenX
            env.currentTarget.classList.add('dragging')
        }
    }
    const whenTouchMove = env => {
        if (!env.target.closest('.card')) {
        env.currentTarget.style.left = ((env.touches[0].screenX - initialDrag.current.left)) + 'px'
        env.currentTarget.style.top = ((env.touches[0].screenY - initialDrag.current.top)) + 'px'
        }
    }

    const whenTouchEnd = env => {
        if (!env.target.closest('.card')) {
        env.currentTarget.classList.remove('dragging')
        env.currentTarget.style.top = 0 + 'px'
        env.currentTarget.style.left = 0 + 'px'
        }
    }
    useEffect(() => {

    }, [])

    return (
        <div className='w-72 p-3 top bg-slate-100 rounded-md shrink-0 relative font-karla select-none cursor-pointer flexListItems'
            style={{ order: props.Id }}
            draggable={!addNewCard} id={props.listId}
            onDragStart={whenDragStart} onTouchStart={whenTouchStart}
            onDrag={whenDragging} onTouchMove={whenTouchMove}
            onDragEnd={whenDragEnd} onTouchEnd={whenTouchEnd}
            onDragEnter={whenDragEnter}
            onDragLeave={whenDragLeave}>

            <div className='flex justify-between items-start'>

                {changeListTitle
                    ? <ClickAwayListener onClickAway={updateListTitle}>
                        <textarea
                            autoFocus
                            style={{ height: `${((Math.floor(thisListTitle.length / 27) + 1)) * 36}px` }}
                            className='overflow-hidden font-semibold resize-none rounded-md w-56 px-2 outline-none bg-white border-blue-600 border-2'
                            value={thisListTitle} name='thisListTitle'
                            onChange={env => setThisListTitle(env.target.value)}
                        />
                    </ClickAwayListener>
                    : <div role='button' onClick={() => setChangeListTitle(true)} className='grow-0'>
                        <h2 className='font-semibold px-2'>{props.listTitle}</h2>
                    </div>
                }

                <div role='button' onClick={() => setShowOptionBox(true)} >
                    <MoreHorizIcon />
                </div>

            </div>

            {showOptionBox
                && <ClickAwayListener onClickAway={() => { setShowOptionBox(false); console.log('hello') }}>
                    <div className='bg-white shadow-2xl w-52 absolute rounded-md top-3 -right-40 font-karla py-2 z-50'>
                        <h1 className='text-center text-slate-500'>List actions </h1>
                        <hr className='border-2 m-2' />
                        <div role='button' className='px-2 hover:bg-slate-300 block'
                            onClick={() => props.deleteList(props.listTitle)}
                        >Delete list...</div>
                    </div>
                </ClickAwayListener>
            }

            {props.listCards.map(card => (<Card {...card} key={card.cardId} parentTitle={props.listTitle} />))}

            <div className='w-full'>

                {!addNewCard
                    ? <div role='button'
                        className='text-slate-400 w-full block rounded-md hover:bg-slate-300 '
                        onClick={() => setAddNewCard(true)}>
                        <AddIcon />
                        <span>Add a card</span>
                    </div>
                    : <ClickAwayListener onClickAway={() => { setAddNewCard(false); setNewCardData('') }}>

                        <div className='fadeIn'>

                            <textarea
                                autoFocus
                                className='overflow-hidden font-karla resize-none rounded-md shadow-md w-full h-16 bg-white outline-none focus:border-2 px-2'
                                value={newCardData}
                                onChange={env => { setNewCardData(env.target.value) }}
                            />

                            <button
                                className='bg-blue-600 rounded-md mt-2 px-2 py-1 text-white'
                                onClick={() => { props.addNewCard(props.listTitle, newCardData); setNewCardData(''); setAddNewCard(false) }}
                            >
                                Add list
                            </button>

                            <span role='button' onClick={() => { setAddNewCard(false); setNewCardData('') }}>
                                <CloseIcon style={{ color: 'rgb(37 99 235)', marginLeft: '7px' }} />
                            </span>

                        </div>

                    </ClickAwayListener>
                }
            </div>

        </div>
    )
}