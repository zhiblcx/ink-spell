import Header from './BaseLayout/Header'
import Content from './BaseLayout/Content'
import Sidebar from './BaseLayout/Sidebar'

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
