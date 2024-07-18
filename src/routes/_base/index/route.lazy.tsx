import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useActionBook } from '@/shared/store'

import InkCard from '@/shared/components/InkCard'
import { inkmock } from '@/mock/inkmock'

function Page() {
  const [books, setBooks] = useState(inkmock.map((item) => ({ ...item, checked: false })))
  const { allSelectFlag, cancelFlag, updateAllSelectFlag, updateCancelFlag } = useActionBook()

  useEffect(() => {
    if (allSelectFlag == -1) {
      return
    }
    if (allSelectFlag == 0) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = false
      })
      setBooks(currentBooks)
    } else if (allSelectFlag == 1) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = true
      })
      setBooks(currentBooks)
    }
  }, [allSelectFlag])

  useEffect(() => {
    if (cancelFlag) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = false
      })
      updateAllSelectFlag(-1)
      setBooks(currentBooks)
      console.log(currentBooks)
    }
  }, [cancelFlag])

  return (
    <>
      <div className="flex flex-wrap min-[375px]:justify-center md:justify-start">
        {books.map((item, index) => {
          return (
            <InkCard
              onClick={() => {
                if (!item.checked) {
                  updateCancelFlag(false)
                }
                if (item.checked) {
                  updateAllSelectFlag(-1)
                }
                const currentBooks = Array.from(books)
                currentBooks[index].checked = !item.checked
                setBooks(currentBooks)
              }}
              ink={item}
              customClassName="mr-4 mb-3 mt-3"
              key={item.id}
            />
          )
        })}
      </div>
    </>
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
