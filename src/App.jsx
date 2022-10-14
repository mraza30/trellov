import React, { useEffect, useState } from 'react'
import List from './components/List'
import Navbar from './components/Navbar'
import NewList from './components/NewList'
import { cardUpdateContext, deleteCardContext } from './components/Context'


export default function App() {
  const [lists_array, set_lists_array] = useState([])

  useEffect(() => {
    document.getElementById('app').addEventListener('dragover', env => env.preventDefault())
    if (localStorage.getItem('listTitlesString')) {
      const localTitlesArray = localStorage.getItem('listTitlesString').split(',')
      let listId = 0
      const localStorageData = localTitlesArray.map(listTitle => {
        let cardId = 0
        if (localStorage.getItem(listTitle).length) {
          var localListCardsArray = localStorage.getItem(listTitle).split(',')
        }
        return {
          listTitle: listTitle,
          listId: listId += 1,
          listCards: localListCardsArray ?
          localListCardsArray.map(cardData => {
            return {
              cardId: cardId += 1,
              cardData: cardData
            }
          })
          : []
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
    console.log('outside')
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
    if (lists_array.length === 1) {
      clearLocalStorage();
      return
    }
    set_lists_array(prevState => {
      let newListId = 0
      const updatedState = prevState.filter(list => {
        if (list.listTitle === listTitle) { return }
        return ({ ...list })
      })
      const updatedListId = updatedState.map(list => ({ ...list, listId: newListId += 1 }))
      return [...updatedListId]
    })
  }

  const addNewCard = (listTitle, cardData) => {
    if (!cardData.length) { return }
    set_lists_array(prevState => {
      const updatedState = prevState.map(list => {
        if (listTitle === list.listTitle) {
          return {
            ...list,
            listCards: [...list.listCards, { cardId: list.listCards.length + 1, cardData: cardData }]
          }
        }
        return { ...list }
      })
      return [...updatedState]
    })
  }

  const updateCardData = (parentTitle, cardId, newData) => {
    if (!newData.length) { return }
    set_lists_array(prevState => {
      const updatedState = prevState.map(list => {
        if (parentTitle === list.listTitle) {
          return {
            ...list,
            listCards: list.listCards.map(card => {
              if (card.cardId === cardId) {
                return { ...card, cardData: newData }
              }
              return { ...card }
            })
          }
        }
        return { ...list }
      })
      return [...updatedState]
    })
  }

  const deleteCard = (parentTitle, cardId) => {
    set_lists_array(prevState => {
      const updatedState = prevState.map(list => {
        if (list.listTitle === parentTitle) {
          const updatedList = {
            ...list,
            listCards: list.listCards.filter(card => (card.cardId != cardId && { ...card }))
          }
          return { ...updatedList }
        }
        return { ...list }
      })
      console.log(updatedState)
      return [...updatedState]
    })
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    set_lists_array('')
  }

  const changeOrder = (listA, listB) => {
    set_lists_array(prevState => {
      let updatedState = prevState.map(list => list)
      let b = { ...updatedState[listA - 1], listId: listB }
      updatedState[listA - 1] = { ...updatedState[listB - 1], listId: listA }
      updatedState[listB - 1] = b

      console.log(updatedState)
      return [...updatedState]
    })
  }


  return (
    <div id='app' className='relative'>

      <Navbar clearLocalStorage={clearLocalStorage} />

      <div className='flex items-start p-5 gap-3 overflow-x-scroll' style={{ height: '90.2%' }} id="scrollable">

        <deleteCardContext.Provider value={deleteCard}>

          <cardUpdateContext.Provider value={updateCardData}>

            {lists_array.length
              ? lists_array.map(list => (<List
                {...list}
                key={list.listTitle}
                updateListTitle={updateListTitle}
                deleteList={deleteList}
                addNewCard={addNewCard}
                changeOrder={changeOrder}
                style={{ order: list.listId }} />))
              : undefined}

          </cardUpdateContext.Provider>

        </deleteCardContext.Provider>

        <NewList addNewList={addNewList} />

      </div>

    </div>
  )
}
