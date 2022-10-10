import React, { useEffect, useMemo, useState } from 'react'
import List from './components/List'
import NewList from './components/NewList'

export default function App() {

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
  const updateTitle = (id, newTitle) => {
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
  // useMemo(() => {
  //   // localStorage.setItem('all_list', all_list.join(',').toString())
  // }, [all_list])

  const mapList = all_list.map(index => <List {...index} key={index.listId} updateTitle={updateTitle} />)
  return (
    <div id='app'>
      <div className='flex items-start px-5 overflow-hidden gap-3'>

        {mapList}
        <NewList addNewlistTitle={addNewlistTitle} />
      </div>

    </div>
  )
}
