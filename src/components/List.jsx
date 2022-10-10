import React, { useRef, useState } from 'react'

export default function List() {
    const [list_title, set_list_title] = useState('')

    const changeListTitle = env => {
        set_list_title(env.target.value)
    }

    let list_style = {
        height: `${((Math.floor(list_title.length / 28) + 1)) * 24}px`
    }
    return (
        <div id='list' className='p-3'>
            <div className='display flex justify-between items-start'>
                <textarea
                    name='list_title' placeholder='Enter list title'
                    value={list_title} onChange={changeListTitle} style={list_style} />

                <a href="#" className=''><div>...</div></a>
            </div>
            <div></div>

        </div>
    )
}
