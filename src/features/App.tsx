import InkCard from '@/features/components/InkCard'
import { inkmock } from '@/mocke/inkmock'

function App() {


  return (
    <main className="flex bg-slate-300 justify-center min-h-screen">
      <div className="grid grid-cols-4 gap-4 my-8">
        {inkmock.map((item, index) => {
          return (
            <InkCard
              ink={item}
              key={index}
            />
          )
        })}
      </div>
    </main>
  )
}

export default App
