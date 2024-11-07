import { operateBookShelfMutation, updateBookShelfDetailMutation } from '@/features/bookshelf'
import { QueryKeys } from '@/shared/enums'
import { EditBookShelfOpenFlag } from '@/shared/enums/EditBookShelfOpenFlag'
import { useActionBookStore } from '@/shared/store'
import { BookShelfType, Ink } from '@/shared/types'
import { RadioChangeEvent, UploadFile } from 'antd'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation(['COMMON', 'PROMPT', 'VALIDATION'])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { bookToBookShelfFlag, updateBookToBookShelfFlag, updateModifyBookShelfFlag } =
    useActionBookStore()
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

  useEffect(() => {
    // bookToBookShelfFlag 为 true 添加到其他书架
    if (bookToBookShelfFlag) {
      form.setFieldsValue({
        bookShelfId: selectOptions[0],
        bookShelfName: '',
        bookShelfDescription: '',
        status: true
      })
    } else {
      // bookToBookShelfFlag 为 false 编辑该书架
      if (currentBookShelf !== undefined) {
        form.setFieldsValue({
          bookShelfName: currentBookShelf.label,
          bookShelfDescription: currentBookShelf.description,
          status: currentBookShelf.isPublic
        })
      }
    }
  }, [bookToBookShelfFlag, currentBookShelf])

  return (
    <Modal
      title={bookToBookShelfFlag ? t('COMMON:add_to_bookshelf') : t('COMMON:edit_bookshelf_info')}
      open={editBookShelfOpenFlag === EditBookShelfOpenFlag.INCREASE}
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
      okText={t('COMMON:save')}
      cancelText={t('COMMON:cancel')}
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
            label={t('COMMON:select_bookshelf')}
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
              label={t('COMMON:bookshelf_name')}
              name="bookShelfName"
              rules={[{ required: true, message: t('VALIDATION:fill_in_completely') }]}
            >
              <Input placeholder={t('VALIDATION:enter_book_name')} />
            </Form.Item>

            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('COMMON:bookshelf_status')}
              name="status"
            >
              <Radio.Group
                value={value}
                onChange={onChange}
              >
                <Radio value={false}>{t('COMMON:private')}</Radio>
                <Radio value={true}>{t('COMMON:public')}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('COMMON:bookshelf_cover')}
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
              label={t('COMMON:bookshelf_description')}
              name="bookShelfDescription"
            >
              <TextArea
                placeholder={t('VALIDATION:enter_bookshelf_description')}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>
          </>
        ) : null}
      </Form>
    </Modal>
  )
}
