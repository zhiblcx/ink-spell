import Header from './BaseLayout/Header'
import Content from './BaseLayout/Content'
import Sidebar from './BaseLayout/Sidebar'

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex grow flex-col">
        <Header />
        <Content />
      </div>
    </div>
  )
}

export default App
