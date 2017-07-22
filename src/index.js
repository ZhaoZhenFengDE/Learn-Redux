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
function renderApp(newAppState,oldAppState={}) {
    // 判断数据是否改变，改变后重新渲染
    if(newAppState === oldAppState) return
    renderTitle(newAppState.title,oldAppState.title)
    renderContent(newAppState.content,oldAppState.content)
}

function renderTitle(title,oldTitle = {}) {
    if(title === oldTitle) return
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content,oldContent={}) {
    if(content === oldContent) return
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            // 使用解构赋值，实现复制对象到一个新的对象中，
            // 同时保留相对应的未改变的数据
            return {
                ...state,
                title:{
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                totle:{
                    ...state.title,
                    color:action.color
                }
            }
        // 返回原state对象
        default:
            return state
    }
}

// 抽离 dispatch 方法，并且将数据的获取放入此方法
// 增加subscribe 的函数，
function createStore(state, stateChanger) {
    const listeners = []
    // 将参数renderApp 放入数组中。
    const subscribe = (listener)=>listeners.push(listener)
    const getState = ()=> (state)
    const dispatch = (action) => {
        // 再此调用stateChanger函数，同时更改state
        state = stateChanger(state, action)
        //循环执行数组中的renderApp函数
        listeners.forEach((listener)=>listener())
    }
    return {getState, dispatch,subscribe}
}

const store = createStore(appState, stateChanger)
let oldState = store.getState() // 缓存获取到旧的state
// 从createStore中获取state数据
store.subscribe(()=>{
    // 获取新的state数据并保存
    const newState = store.getState()
    renderApp(newState,oldState)
    oldState = newState // 完成渲染之后，新的newState 变为旧的oldState,等待下一次数据的变化重新渲染
})

renderApp(store.getState())
// 修改源数据
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '正在学习redux'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'red'})
