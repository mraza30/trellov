//updating the title of a list passes as a prop to component <List>
  // const updateTitle = (id, newTitle) => {
  //   if (!newTitle.length) { return }
  //   set_lists_array(prevState => {
  //     const updateData = prevState.map(index => {
  //       if (index.listId === id) {
  //         return {
  //           ...index,
  //           title: newTitle
  //         }
  //       }
  //       return { ...index }
  //     })
  //     return [...updateData]
  //   })
  // }

  // const deleteList = id => {
  //   console.log(lists_array)
  //   set_lists_array(prevState => {
  //     const updatedState = prevState.filter(index => {
  //       if (index.listId === id) {
  //         return
  //       }
  //       return { ...index}
  //     })
  //     return[...updatedState]
  //   })
  // }

  // const addNewCard = (id, newTitle) => {
  //   if (!newTitle.length) { return }
  //   set_lists_array(prevState => {
  //     const updateState = prevState.map(index => {
  //       if (id === index.listId) {
  //         return {
  //           ...index,
  //           listCards: [...index.listCards, { cardId: index.listCards.length + 1, cardData: newTitle }]
  //         }
  //       }
  //       return {
  //         ...index
  //       }
  //     })
  //     return [...updateState]
  //   })
  // }



  // const updateCardData = (parentId, cardId, data) => {
  //   if (!data.length) { return }
  //   set_lists_array(prevState => {
  //     const updateState = prevState.map(index => {
  //       if (parentId === index.listId) {
  //         return {
  //           ...index,
  //           listCards: index.listCards.map(newPrevState => {
  //             if (newPrevState.cardId === cardId) {
  //               return {
  //                 ...newPrevState,
  //                 cardData: data
  //               }
  //             }
  //             return { ...newPrevState }
  //           })
  //         }
  //       }
  //       return {
  //         ...index
  //       }
  //     })
  //     return [...updateState]
  //   })
  // }
  //mapping the data lo list need to be rendered
  //const mapList = lists_array.map(index => <List {...index} key={index.listId} updateTitle={updateTitle} addNewCard={addNewCard} />)




  ...........list

  // //
    // const [is_new_card, set_is_new_card] = useState(false)

    // //
    // const [new_card_title, set_new_card_title] = useState('')

    // const [show_option_box, set_show_option_box] = useState(false)

    //updating thisListTitle on every keystroke locally
    // const updateTitle = (env) => {
    //     setThisListTitle(env.target.value)
    // }
    //submiting the thisListTitle to get it updated on storage


    // const addNewCardTitle = () => {
    //     set_is_new_card(prevState => !prevState)
    //     set_new_card_title('')
    // }
    //changing textarea height dynamically
    // let list_style_height = {
    //     height: `${((Math.floor(thisListTitle.length / 27) + 1)) * 36}px`
    // }

     {/* <div>
                {props.listCards.length && props.listCards.map(index => (<Card {...index} key={index.cardId} parentId={props.listId} updateCardData={props.updateCardData} />))}
            </div> */}


            {/* <div className='w-full'>
                {
                    !is_new_card ?
                        <a
                            href="#" className='text-slate-400 w-full block rounded-md hover:bg-slate-300 '
                            onClick={() => (set_is_new_card(prevState => !prevState))}>
                            <AddIcon />
                            <span className='font-karla'>Add a card</span>
                        </a> :
                        <ClickAwayListener onClickAway={addNewCardTitle}>
                            <div className='fadeIn'>
                                <textarea
                                    autoFocus
                                    id='updatedCardTitle'
                                    className='overflow-hidden font-karla resize-none rounded-md shadow-md w-full h-16 bg-white outline-none focus:border-2 px-2'
                                    value={new_card_title} name='new_card_title'
                                    onChange={env => { set_new_card_title(env.target.value) }}
                                />
                                <button
                                    className='bg-blue-600 rounded-md mt-2 px-2 py-1 text-white'
                                    onClick={() => { props.addNewCard(props.listId, new_card_title); addNewCardTitle() }}>
                                    Add list
                                </button>
                                <a href="#" onClick={addNewCardTitle}>
                                    <CloseIcon style={{ color: 'rgb(37 99 235)', marginLeft: '7px' }} />
                                </a>
                            </div>
                        </ClickAwayListener>
                }
            </div>


            {/* <div className='w-full'>
                {!addNewCard
                    ? <a
                        href="#" className='text-slate-400 w-full block rounded-md hover:bg-slate-300 '
                        onClick={() => (setAddNewCard(true))}>
                        <AddIcon />
                        <span className='font-karla'>Add a card</span>
                    </a> :
                    <ClickAwayListener onClickAway={() => (setAddNewCard(false))}>
                        <div className='fadeIn'>
                            <textarea
                                autoFocus
                                className='overflow-hidden font-karla resize-none rounded-md shadow-md w-full h-16 bg-white outline-none focus:border-2 px-2'
                                value={new_card_title} name='new_card_title'
                                onChange={env => { set_new_card_title(env.target.value) }}
                            />
                            <button
                                className='bg-blue-600 rounded-md mt-2 px-2 py-1 text-white'
                                onClick={() => { props.addNewCard(props.listId, new_card_title); addNewCardTitle() }}>
                                Add list
                            </button>
                            <a href="#" onClick={addNewCardTitle}>
                                <CloseIcon style={{ color: 'rgb(37 99 235)', marginLeft: '7px' }} />
                            </a>
                        </div>
                    </ClickAwayListener>
                } */}