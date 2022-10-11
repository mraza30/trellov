import React from 'react'

export default function Card(props) {
  return (
    <div className='bg-white font-karla rounded-md shadow-md my-3 hover:bg-slate-300'>
        <h2 className='font-karla p-2'>{props.cardData}</h2>
    </div>
  )
}
