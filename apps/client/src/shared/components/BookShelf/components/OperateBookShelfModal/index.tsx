import { operateBookShelfMutation, updateBookShelfDetailMutation } from '@/features/bookshelf'
import { BookShelfType, TagType } from '@/shared/types'
import { RadioChangeEvent } from 'antd'
import { UploadFile } from 'antd/lib'
import SelectTag from '../SelectTag'
import { OperateBookShelfModalProps } from './props'

interface formProps {
  bookShelfId: string
  bookShelfName: string
}

export function OperateBookShelfModal({
  books,
  setBooks,
  currentBookShelf,
  selectBookShelfValue,
  setSelectBookShelfValue,
  selectOptions
}: OperateBookShelfModalProps) {
  const { t } = useTranslation(['COMMON', 'PROMPT', 'VALIDATION'])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const {
    bookToBookShelfFlag,
    modifyBookShelfFlag,
    updateBookToBookShelfFlag,
    updateModifyBookShelfFlag
  } = useActionBookStore()
  const [value, setValue] = useState(false)
  const [editBookShelfOpenFlag, setEditBookShelfOpenFlag] = useState(false)
  const [cover, setCover] = useState<UploadFile[]>([])

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
    () => queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.BOOKSHELF_KEY] }),
    () => queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.BOOKSHELF_BOOK_KEY] })
  )

  const { mutate: updateBookShelfMutate } = updateBookShelfDetailMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.BOOKSHELF_KEY] })
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
    if (bookToBookShelfFlag || modifyBookShelfFlag) {
      // 修改
      if (modifyBookShelfFlag) {
        setCover([
          {
            uid: currentBookShelf.id.toString(),
            name: currentBookShelf.label,
            status: 'done',
            url: import.meta.env.VITE_SERVER_URL + currentBookShelf.cover
          }
        ])
        form.setFieldsValue({
          id: currentBookShelf.id,
          bookShelfName: currentBookShelf.label,
          status: currentBookShelf.isPublic,
          bookShelfDescription: currentBookShelf.description ?? t('COMMON:no_description')
        })
      } else {
        // 新增
        setSelectBookShelfValue(selectOptions[0].value)
        form.setFieldsValue({
          bookShelfId: selectOptions[0].value,
          status: false,
          bookShelfName: '',
          bookShelfDescription: ''
        })
        setCover([])
      }
      setEditBookShelfOpenFlag(true)
    }
  }, [bookToBookShelfFlag, modifyBookShelfFlag])

  return (
    <Modal
      title={bookToBookShelfFlag ? t('COMMON:add_to_bookshelf') : t('COMMON:edit_bookshelf_info')}
      open={editBookShelfOpenFlag}
      onOk={() => {
        form.submit()
        setEditBookShelfOpenFlag(false)
      }}
      onCancel={() => {
        setEditBookShelfOpenFlag(false)
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
              label={t('COMMON:bookshelf_tag')}
              name="tags"
            >
              <SelectTag
                form={form}
                tags={currentBookShelf?.tags as TagType[]}
              />
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
            <>
              {value && (
                <div>
                  <h1>{t('COMMON:copyright.title')}</h1>
                  <ul>
                    <li>{t('COMMON:copyright.points.0')}</li>
                    <li>{t('COMMON:copyright.points.1')}</li>
                    <li>{t('COMMON:copyright.points.2')}</li>
                  </ul>
                </div>
              )}
            </>
          </>
        ) : null}
      </Form>
    </Modal>
  )
}
