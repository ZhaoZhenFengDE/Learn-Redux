const appState = {
  title: {
    text: '学习React',
    color: 'red',
  },
  content: {
    text: 'React内容',
    color: 'blue'
  }
}

function renderApp (appState){
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title){
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent (content){
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}



dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })
dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })


function dispatch (action){
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
}

renderApp(appState)


function createStore (state,stateChanger){
    const getState = () => state
    const dispatch = (action) => stateChanger(state,action)
    return {getState,dispatch}
}