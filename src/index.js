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
    // 由于被listeners push进去的是renderApp函数，参数为getState函数，所以在此执行一下， 获取数据后进入渲染
    const date = appState()
    renderTitle(date.title)
    renderContent(date.content)
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

// 增加subscribe 的函数，
function createStore(state, stateChanger) {
    const listeners = []
    // 将参数renderApp 放入数组中。
    const subscribe = (listener)=>listeners.push(listener)
    const getState = ()=> state
    const dispatch = (action) => {
        stateChanger(state, action)
        //循环执行数组中的renderApp函数
        listeners.forEach((listener)=>listener())
    }
    return {getState, dispatch,subscribe}
}

const store = createStore(appState, stateChanger)

// 从createStore中获取state数据
store.subscribe(()=>(renderApp(store.getState)))


// 修改源数据
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '正在学习redux'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'red'})
