import '@/assets/styles/index.scss'
import AntdProvider from '@/shared/provider/AntdProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/config.ts'
import TanstackProvider from './shared/provider/TanstackProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdProvider>
      <TanstackProvider />
    </AntdProvider>
  </React.StrictMode>
)
