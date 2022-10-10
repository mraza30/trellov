import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function List(props) {
    //title of a list
    const [title, set_title] = useState(props.title)
    //updating title on every keystroke locally
    const updateTitle = (env) => {
        set_title(env.target.value)
    }
    //submiting the title to get it updated on storage
    const submitNewTitle = () => {
        //preventing empty title
        if (!title.length) {
            set_title(props.title)
        }
        //submiting new title
        else {
            props.updateTitle(props.listId, title)
        }
    }
    //changing textarea height dynamically
    let list_style_height = {
        height: `${((Math.floor(title.length / 27) + 1)) * 36}px`
    }

    return (
        <div className='w-72 p-3 bg-slate-100 rounded-md shrink-0'>
            <div className='flex justify-between'>
                <ClickAwayListener onClickAway={submitNewTitle}>
                    <textarea
                        id='updatedTitle'
                        style={list_style_height}
                        className='overflow-hidden font-karla text-base font-semibold resize-none rounded-md w-56 bg-transparent outline-none focus:bg-white focus:border-blue-600 focus:border-2 px-2'
                        value={title} name='title'
                        onChange={updateTitle}
                    />

                </ClickAwayListener>
                <a href="#">
                    <MoreHorizIcon />
                </a>
            </div>
        </div>
    )
}



































// import React, { useRef, useState } from 'react'

// export default function List() {
//     const [list_title, set_list_title] = useState('')

//     const changeListTitle = env => {
//         set_list_title(env.target.value)
//     }

//     let list_style = {
//         height: `${((Math.floor(list_title.length / 28) + 1)) * 24}px`
//     }
//     return (
//         <div id='list' className='p-2 bg-slate-300'>
//             <div className='display flex justify-between items-start'>
//                 <textarea
//                     name='list_title' placeholder='Enter list title'
//                     value={list_title} onChange={changeListTitle} style={list_style} />

//                 <a href="#" className=''><div className='list-options'>```</div></a>
//             </div>
//             <div></div>

//         </div>
//     )
// }
