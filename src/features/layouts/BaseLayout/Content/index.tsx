import InkCard from '@/shared/components/InkCard'
import { inkmock } from '@/mock/inkmock'

function Content() {
  return (
    <main className="dark:bg-black grow overflow-y-auto h-screen pt-2">
      <div className="flex flex-wrap">
        {inkmock.map((item, index) => {
          return (
            <InkCard
              ink={item}
              customClassName="mr-4 mb-3 mt-3"
              key={index}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Content
