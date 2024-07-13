import InkCard from '@/shared/components/InkCard'
import { inkmock } from '@/mock/inkmock'

function Content() {
  return (
    <main className="dark:bg-slate-900 grow overflow-y-auto h-screen pt-2">
      <div className="flex flex-wrap ml-6">
        {inkmock.map((item, index) => {
          return (
            <InkCard
              ink={item}
              customClassName="m-3"
              key={index}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Content
