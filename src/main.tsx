import React from 'react'
import ReactDOM from 'react-dom/client'
import AntdProvider from '@/shared/provider/AntdProvider'
import TanstackProvider from './shared/provider/TanstackProvider'
import '@/assets/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdProvider>
      <TanstackProvider />
    </AntdProvider>
  </React.StrictMode>
)
