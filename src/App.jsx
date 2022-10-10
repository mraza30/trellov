import React, { useEffect, useMemo, useState } from 'react'
import List from './components/List'
import NewList from './components/NewList'
import ScrollContainer from 'react-indiana-drag-scroll'

export default function App() {
  //Data for all the list
  //Data should be stored in localstorage---
  const [all_list, set_all_list] = useState([
    {
      title: 'Doing',
      listId: 1,
      listCards: [
        {
          cardId: 1,
          cardData: 'Building Trellov'
        }
      ]
    },])
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

  //mapping the data lo list need to be rendered
  const mapList = all_list.map(index => <List {...index} key={index.listId} updateTitle={updateTitle} />)
  return (
    <div id='app'>
      <div className='flex items-start p-5 overflow-hidden gap-3 h-full overflow-x-auto'>
        {mapList}
        <NewList addNewlistTitle={addNewlistTitle} />
      </div>
    </div>
  )
}
