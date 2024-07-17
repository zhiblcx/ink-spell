import { createLazyFileRoute } from '@tanstack/react-router'
import { inkmock } from '@/mock/inkmock'
import InkCard from '@/shared/components/InkCard'

function Page() {
  return (
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
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
