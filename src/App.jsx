import React, { useEffect, useMemo, useState } from 'react'
import List from './components/List'
import Navbar from './components/Navbar'
import NewList from './components/NewList'

export default function App() {
  let localStorageData
  if (localStorage.getItem('title') != null) {
    const localTitleData = localStorage.getItem('title').split(',')
    let letId = 0
    localStorageData = localTitleData.map(index => {
      let letCardId = 0
      const localCardData = localStorage.getItem(letId + 1).split(',')
      return {
        title: index,
        listId: letId += 1,
        listCards: localCardData.map(newIndex => {
          return {
            cardId: letCardId += 1,
            cardData: newIndex
          }
        })
      }
    })
  }
  //Data for all the list
  //Data should be stored in localstorage---
  const [all_list, set_all_list] = useState(localStorageData ? localStorageData : [
    {
      title: 'Doing',
      listId: 1,
      listCards: [
        {
          cardId: 1,
          cardData: 'Building Trellov'
        },
      ]
    },])

  useEffect(() => {
    if (all_list) {
      localStorage.setItem('title', all_list.map(index => index.title).join(',').toString())
      all_list.forEach(index => {
        localStorage.setItem(index.listId, index.listCards.map(newIndex => newIndex.cardData).join(',').toString())
      })
    }
  }, [all_list])
  // passed as a prop to <NewList> component building new list   
  const addNewlistTitle = (new_list_title) => {
    new_list_title.length ? set_all_list(prevState => (
      [...prevState,
      {
        title: new_list_title,
        listId: all_list.length + 1,
        listCards: [
          {
            cardId: 1,
            cardData: 'Building Trellov'
          }
        ]
      }])) : alert('Write Something...')
  }
  //updating the title of a list passes as a prop to component <List>
  const updateTitle = (id, newTitle) => {
    if (!newTitle.length) { return }
    set_all_list(prevState => {
      const updateData = prevState.map(index => {
        if (index.listId === id) {
          return {
            ...index,
            title: newTitle
          }
        }
        return { ...index }
      })
      return [...updateData]
    })
  }

  const addNewCard = (id, newTitle) => {
    if (!newTitle.length) { return }
    set_all_list(prevState => {
      const updateState = prevState.map(index => {
        if (id === index.listId) {
          return {
            ...index,
            listCards: [...index.listCards, { cardId: index.listCards.length + 1, cardData: newTitle }]
          }
        }
        return {
          ...index
        }
      })
      return [...updateState]
    })
  }
  const clearLocalStorage = () => {
    localStorage.clear()
    localStorageData = null
    set_all_list('')
  }
  //mapping the data lo list need to be rendered
  //const mapList = all_list.map(index => <List {...index} key={index.listId} updateTitle={updateTitle} addNewCard={addNewCard} />)
  return (
    <div id='app'>
      <Navbar clearLocalStorage={clearLocalStorage} />
      <div className='flex items-start p-5 overflow-hidden gap-3 h-full overflow-x-auto'>
        {all_list && all_list.map(index => <List {...index} key={index.listId} updateTitle={updateTitle} addNewCard={addNewCard} />)}
        <NewList addNewlistTitle={addNewlistTitle} />
      </div>
    </div>
  )
}
