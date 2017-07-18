const appState = {
    title: {
        text: '学习React',
        color: 'red'
    },
    content: {
        text: 'React内容',
        color: 'blue'
    }
}
function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}

// 抽离 dispatch 方法，并且将数据的获取放入此方法
function createStore(state, stateChanger) {
    const getState = ()=> state
    const dispatch = (action) => stateChanger(state, action)
    return {getState, dispatch}
}

const store = createStore(appState, stateChanger)

// 从createStore中获取state数据
renderApp(store.getState())


// 修改源数据
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'})

renderApp(store.getState())
