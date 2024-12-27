import '@/assets/styles/index.scss'
import AntdProvider from '@/shared/provider/AntdProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import I18NextProvider from './shared/provider/I18nextProvider'
import TanstackProvider from './shared/provider/TanstackProvider'
import { IndexedDB } from './shared/utils/IndexedDBUtils'

IndexedDB.openDB()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdProvider>
      <I18NextProvider>
        <TanstackProvider />
      </I18NextProvider>
    </AntdProvider>
  </React.StrictMode>
)
