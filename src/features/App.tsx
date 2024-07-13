import Header from './layouts/BaseLayout/Header'
import Content from './layouts/BaseLayout/Content'
import Sidebar from './layouts/BaseLayout/Sidebar'

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex grow">
        <Sidebar />
        <Content />
      </div>
    </div>
  )
}

export default App
