import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './features/layouts/App'
import AntdProvider from '@/shared/provider/AntdProvider'
import '@/assets/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdProvider>
      <App />
    </AntdProvider>
  </React.StrictMode>
)
