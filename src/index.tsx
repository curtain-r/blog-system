import React from 'react'
import ReactDOM from 'react-dom'
import Provider from '@store/index'

import App from '@views/App'

// icon样式
import './styles/icon.scss'

const render = () => {
  ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    document.querySelector('#app')
  )
}

render()
