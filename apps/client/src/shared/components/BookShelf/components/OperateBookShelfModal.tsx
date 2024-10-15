import { operateBookShelfMutation, updateBookShelfDetailMutation } from '@/features/bookshelf'
import { QueryKeys } from '@/shared/enums'
import { EditBookShelfOpenFlag } from '@/shared/enums/EditBookShelfOpenFlag'
import { useActionBookStore } from '@/shared/store'
import { BookShelfType, Ink } from '@/shared/types'
import { useQueryClient } from '@tanstack/react-query'
import { RadioChangeEvent, UploadFile } from 'antd'
import UploadPhoto from '../../UploadPhoto'

interface formProps {
  bookShelfId: string
  bookShelfName: string
}

interface OperateBookShelfModalProps {
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
  currentBookShelf: BookShelfType
  editBookShelfOpenFlag: EditBookShelfOpenFlag
  setEditBookShelfOpenFlag: React.Dispatch<React.SetStateAction<EditBookShelfOpenFlag>>
  cover: UploadFile<any>[]
  setCover: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  selectBookShelfValue: string
  setSelectBookShelfValue: React.Dispatch<React.SetStateAction<string>>
  selectOptions: {
    value: string
    label: string
  }[]
}

export function OperateBookShelfModal({
  books,
  setBooks,
  currentBookShelf,
  editBookShelfOpenFlag,
  setEditBookShelfOpenFlag,
  cover,
  setCover,
  selectBookShelfValue,
  setSelectBookShelfValue,
  selectOptions
}: OperateBookShelfModalProps) {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { bookToBookShelfFlag, updateBookToBookShelfFlag, updateModifyBookShelfFlag } = useActionBookStore()
  const [value, setValue] = useState(true)

  const handleChange = (value: string) => {
    setSelectBookShelfValue(value)
  }

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const handlerUpdateBookShelf = (bookShelfId: number) => {
    setBooks(
      books.filter((item) => {
        if (item.checked) {
          const obj = {
            api: `/book/${item.id}`,
            operate: 'update',
            bookShelfInfo: {
              ...item,
              bookShelfId: bookShelfId
            }
          }
          operateBookShelfMutate(obj)
          return false
        }
        return true
      }) ?? []
    )
  }

  const queryClient = useQueryClient()
  const { mutate: operateBookShelfMutate } = operateBookShelfMutation(
    handlerUpdateBookShelf,
    () => queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKSHELF_KEY] }),
    () => queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKSHELF_BOOK_KEY] })
  )

  const { mutate: updateBookShelfMutate } = updateBookShelfDetailMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKSHELF_KEY] })
  )

  const handlerFinish = (bookShelf: formProps, operate: number) => {
    if (operate === 1) {
      const obj = {
        api: '/bookshelf',
        operate: 'add',
        bookShelfInfo: {
          ...bookShelf,
          bookShelfId: -1
        }
      }
      if (bookShelf.bookShelfId === selectOptions[0].value) {
        operateBookShelfMutate(obj)
      } else {
        handlerUpdateBookShelf(Number(bookShelf.bookShelfId))
      }
    } else {
      const bookShelfData: unknown = {
        ...bookShelf,
        id: currentBookShelf.id,
        position: currentBookShelf.position
      }

      updateBookShelfMutate(bookShelfData as BookShelfType)
    }
  }

  return (
    <Modal
      title={bookToBookShelfFlag ? '添加到书架' : '编辑书架信息'}
      open={editBookShelfOpenFlag == EditBookShelfOpenFlag.INCREASE}
      onOk={() => {
        form.submit()
        setEditBookShelfOpenFlag(EditBookShelfOpenFlag.MODIFY)
        updateBookToBookShelfFlag(false)
        updateModifyBookShelfFlag(false)
      }}
      onCancel={() => {
        setEditBookShelfOpenFlag(EditBookShelfOpenFlag.MODIFY)
      }}
      afterClose={() => {
        updateBookToBookShelfFlag(false)
        updateModifyBookShelfFlag(false)
      }}
      okText="保存"
      cancelText="取消"
      className="flex justify-center text-center"
    >
      <Form
        className="flex flex-col justify-center p-5 px-8"
        form={form}
        onFinish={(bookShelf) => handlerFinish(bookShelf, bookToBookShelfFlag ? 1 : 0)}
      >
        {bookToBookShelfFlag ? (
          <Form.Item
            className="min-[375px]:w-[200px] md:w-[250px]"
            label="选择书架"
            name="bookShelfId"
          >
            <Select
              onChange={handleChange}
              style={{ width: 180 }}
              options={selectOptions}
            />
          </Form.Item>
        ) : null}

        {selectBookShelfValue === selectOptions[0].value ? (
          <>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书架名"
              name="bookShelfName"
              rules={[{ required: true, message: '请填写完整' }]}
            >
              <Input placeholder="请输入书架名" />
            </Form.Item>

            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书架状态"
              name="status"
            >
              <Radio.Group
                value={value}
                onChange={onChange}
              >
                <Radio value={false}>私有</Radio>
                <Radio value={true}>公开</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书架封面"
              name="bookShelfCover"
            >
              <UploadPhoto
                form={form}
                name="bookShelfCover"
                fileName={cover}
                setFileName={setCover}
              />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书架描述 "
              name="bookShelfDescription"
            >
              <TextArea
                placeholder="请输入书架的描述"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>
          </>
        ) : null}
      </Form>
    </Modal>
  )
}
