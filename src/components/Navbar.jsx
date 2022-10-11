import React from 'react'

export default function Navbar(props) {
    return (
        <div className='w-full bg-blue-700 bg-opacity-40 shadow-md h-12 font-karla text-white px-4 flex items-center justify-between'>
            <h1 className='font-bold text-xl'>Trellov</h1>
            <button
                onClick={props.clearLocalStorage}
                className='bg-blue-800 bg-opacity-60 rounded-md px-4 py-1 hover:bg-opacity-80'>
                Clear local storage
            </button>
        </div>
    )
}
