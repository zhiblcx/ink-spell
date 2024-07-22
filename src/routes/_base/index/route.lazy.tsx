import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { AllSelectFlag } from '@/shared/enums'

import InkCard from '@/shared/components/InkCard'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { inkmock } from '@/mock/inkmock'

export function Page() {
  const [books, setBooks] = useState(inkmock.map((item) => ({ ...item, checked: false })))
  const {
    allSelectFlag,
    cancelFlag,
    deleteFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateDeleteFlag,
    updateShowShelfFlag
  } = useActionBookStore()

  useEffect(() => {
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [])

  useEffect(() => {
    if (allSelectFlag == AllSelectFlag.PARTIAL_SELECT_FLAG) {
      return
    }
    if (allSelectFlag == AllSelectFlag.ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = false
      })
      setBooks(currentBooks)
    } else if (allSelectFlag == AllSelectFlag.NOT_ALL_SELECT_FLAG) {
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
      updateAllSelectFlag(AllSelectFlag.PARTIAL_SELECT_FLAG)
      setBooks(currentBooks)
    }
  }, [cancelFlag])

  useEffect(() => {
    if (deleteFlag) {
      const deleteIds = books.reduce((ids: number[], book: Ink) => {
        if (book.checked) {
          ids.push(book.id)
        }
        return ids
      }, [])
      if (deleteIds.length != 0) {
        setBooks(books.filter((book) => !deleteIds.includes(book.id)))
        message.success('删除成功')
      }
      updateDeleteFlag(false)
    }
  }, [deleteFlag])

  return (
    <>
      <div>
        <div className="flex flex-wrap min-[375px]:justify-center md:justify-start">
          {books.map((item, index) => {
            return (
              <InkCard
                onClick={() => {
                  if (!item.checked) {
                    updateCancelFlag(false)
                  }
                  if (item.checked) {
                    updateAllSelectFlag(AllSelectFlag.PARTIAL_SELECT_FLAG)
                  }
                  const currentBooks = Array.from(books)
                  currentBooks[index].checked = !item.checked
                  setBooks(currentBooks)
                }}
                ink={item}
                customClassName="mr-4 mb-3 mt-3"
                key={item.id}
                cancelFlag={cancelFlag}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
