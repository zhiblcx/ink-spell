import '@/assets/styles/index.scss'
import AntdProvider from '@/shared/provider/AntdProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/i18n/config'
import TanstackProvider from './shared/provider/TanstackProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdProvider>
      <TanstackProvider />
    </AntdProvider>
  </React.StrictMode>
)
