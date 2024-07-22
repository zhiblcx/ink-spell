import { useEffect, Suspense } from 'react'
import { message, Skeleton } from 'antd'
import { motion } from 'framer-motion'

import { AllSelectFlag } from '@/shared/enums'
import InkCard from '@/shared/components/InkCard'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'

interface BookShelfType {
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
}

function BookShelf({ books, setBooks }: BookShelfType) {
  const { allSelectFlag, cancelFlag, deleteFlag, updateAllSelectFlag, updateCancelFlag, updateDeleteFlag } =
    useActionBookStore()

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
    <Suspense fallback={<Skeleton />}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex flex-wrap min-[375px]:justify-center md:justify-start"
      >
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
                if (books.every((book) => book.checked)) {
                  updateAllSelectFlag(AllSelectFlag.NOT_ALL_SELECT_FLAG)
                }
              }}
              ink={item}
              customClassName="mr-4 mb-3 mt-3"
              key={item.id}
              cancelFlag={cancelFlag}
            />
          )
        })}
      </motion.div>
    </Suspense>
  )
}

export default BookShelf
