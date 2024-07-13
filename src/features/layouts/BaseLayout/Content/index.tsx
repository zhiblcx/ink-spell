import InkCard from '@/shared/components/InkCard'
import { inkmock } from '@/mocke/inkmock'

function Content() {
  return (
    <main className="grow bg-slate-400">
      <div className="flex flex-wrap overflow-y-auto ml-6">
        {inkmock.map((item, index) => {
          return (
            <InkCard
              ink={item}
              customClassName="m-5"
              key={index}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Content
