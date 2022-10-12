import { ConstructionOutlined } from '@mui/icons-material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import List from './components/List'
import Navbar from './components/Navbar'
import NewList from './components/NewList'

export default function App() {
  const [lists_array, set_lists_array] = useState([])
  useEffect(() => {
    if (localStorage.getItem('listTitlesString')) {
      const localTitlesArray = localStorage.getItem('listTitlesString').split(',')
      let listId = 0
      const localStorageData = localTitlesArray.map(listTitle => {
        let cardId = 0
        const localListCardsArray = localStorage.getItem(listTitle).split(',')
        return {
          listTitle: listTitle,
          listId: listId += 1,
          listCards: localListCardsArray.map(cardData => {
            return {
              cardId: cardId += 1,
              cardData: cardData
            }
          })
        }
      })
      set_lists_array(localStorageData)
    }
    else {
      set_lists_array([
        {
          listTitle: 'Doing',
          listId: 1,
          listCards: [
            {
              cardId: 1,
              cardData: 'Building Trellov'
            },
          ]
        },])
    }
  }, [])
  useEffect(() => {
    console.log('ouside')
    if (lists_array.length) {
      console.log('inside')
      localStorage.clear()
      localStorage.setItem('listTitlesString', lists_array.map(list => list.listTitle).join(',').toString())
      lists_array.forEach(list => {
        localStorage.setItem(list.listTitle, list.listCards.map(card => card.cardData).join(',').toString())
      })
    }
  }, [lists_array])

  const addNewList = newListTitle => {
    newListTitle.length ? localStorage.getItem(newListTitle) === null
      ? set_lists_array(prevState => ([
        ...prevState,
        {
          listTitle: newListTitle,
          listId: prevState.length + 1,
          listCards: [
            {
              cardId: 1,
              cardData: 'Building Trellov'
            },
          ]
        }
      ]))
      : alert('List already created....')
      : alert('Write Something....')
  }

  const updateListTitle = (oldListTitle, newListTitle) => {
    newListTitle.length ? localStorage.getItem(newListTitle) === null
      ? set_lists_array(prevState => {
        const updatedState = prevState.map(list => {
          if (list.listTitle === oldListTitle) {
            return { ...list, listTitle: newListTitle }
          }
          return { ...list }
        })
        return [...updatedState]
      })
      : undefined : undefined
  }

  const deleteList = listTitle => {
    set_lists_array(prevState => {
      let newListId=0
      const updatedState = prevState.filter(list => {
        if (list.listTitle === listTitle) { return }
        return ({ ...list})
      })
      const updatedListId = updatedState.map(list => ({...list, listId: newListId += 1}))
      return [...updatedListId]
    })
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    set_lists_array('')
  }

  return (
    <div id='app'>
      <Navbar clearLocalStorage={clearLocalStorage} />
      <div className='flex items-start p-5 gap-3 overflow-x-scroll' style={{ height: '90.3%' }}>
        {lists_array.length ?
          lists_array.map(list => (<List {...list} key={list.listTitle} updateListTitle={updateListTitle} deleteList={deleteList} />))
          : undefined}
        {/* {lists_array && lists_array.map(index => <List {...index} key={index.listId} updateTitle={updateTitle} addNewCard={addNewCard} updateCardData={updateCardData} deleteList={deleteList} />)} */}
        <NewList addNewList={addNewList} />
      </div>
    </div>
  )
}
