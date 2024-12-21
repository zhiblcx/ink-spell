import { PublicBookshelfDao, selectPublicBookShelfQuery } from '@/features/bookshelf'
import { getAllTagQuery } from '@/features/tag'
import { DEFAULT_TAG_COLORS } from '@/shared/constants/app'
import { useLanguageStore } from '@/shared/store'
import { TagType } from '@/shared/types'
import { UrlUtils } from '@/shared/utils'
import { FilterFilled, SearchOutlined } from '@ant-design/icons'
import { createLazyFileRoute } from '@tanstack/react-router'
import type { PaginationProps, TableColumnType } from 'antd'
import { Input, Table, TableProps } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'

export const Route = createLazyFileRoute('/_base/bookstore')({
  component: RouteComponent
})

interface DataType {
  key: number
  username: string
  userId: number
  bookshelf_name: string
  bookshelf_description: string
  tags: string[]
}

interface tableParamsType {
  pagination: {
    page: number
    limit: number
    select: string | undefined
    value: Array<string> | undefined
    bookshelfName: string | undefined
  }
}

type DataIndex = keyof DataType

function RouteComponent() {
  const languageStore = useLanguageStore()
  const { t } = useTranslation(['AUTH', 'COMMON', 'PROMPT'])
  const [tableParams, setTableParams] = useState<tableParamsType>({
    pagination: {
      page: 1,
      limit: 20,
      select: undefined,
      value: undefined,
      bookshelfName: undefined
    }
  })
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const { data: publicBookshelfQuery, isLoading } = selectPublicBookShelfQuery(
    tableParams.pagination.page,
    tableParams.pagination.limit,
    tableParams.pagination.select,
    tableParams.pagination.value,
    tableParams.pagination.bookshelfName
  )
  const { data: allTagQuery } = getAllTagQuery()
  const router = useRouter()

  const onChange: PaginationProps['onChange'] = (page) =>
    setTableParams({ pagination: { ...tableParams.pagination, page } })

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div onKeyDown={(e) => e.stopPropagation()}>
        <Input.Search
          placeholder={t('PROMPT:search_bookshelf_name')}
          allowClear
          enterButton={t('COMMON:search')}
          size="large"
          onSearch={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => record.bookshelf_name.includes(value as string),
    render: (text, { key }) => (
      <a
        onClick={() => {
          const id = UrlUtils.encodeUrlById(key.toString())
          router.navigate({ to: `/bookshelf/${id}` })
        }}
      >
        {searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        )}
      </a>
    )
  })

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('COMMON:bookshelf_name'),
      dataIndex: 'bookshelf_name',
      width: 200,
      ellipsis: true,
      ...getColumnSearchProps('bookshelf_name')
    },
    {
      title: t('AUTH:username'),
      dataIndex: 'username',
      width: 200,
      ellipsis: true,
      render: (text, { userId }) => (
        <a
          onClick={() => {
            const id = UrlUtils.encodeUrlById(userId.toString())
            router.navigate({ to: `/otherbookshelf/${id}` })
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: t('COMMON:bookshelf_tag'),
      dataIndex: 'tags',
      width: 300,
      filters: allTagQuery?.data.map((tag: TagType) => ({
        text: languageStore.language === LanguageEnum.Chinese ? tag.nameChinese : tag.nameEnglish,
        value: languageStore.language === LanguageEnum.Chinese ? tag.nameChinese : tag.nameEnglish
      })),
      filterSearch: true,
      onFilter: (value, record) => record.tags.includes(value as string),
      filterIcon: (filtered: boolean) => (
        <FilterFilled style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      render: (_, { tags, key }) => (
        <>
          {tags.map((tag, index) => {
            const color = DEFAULT_TAG_COLORS[Number(key + index) % DEFAULT_TAG_COLORS.length]
            return (
              <Tag
                color={color}
                key={tag}
              >
                {tag}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: t('COMMON:bookshelf_description'),
      dataIndex: 'bookshelf_description',
      ellipsis: true,
      width: 400
    }
  ]

  const data: DataType[] = publicBookshelfQuery?.data?.items?.map(
    (bookshelf: PublicBookshelfDao) => ({
      key: bookshelf.id,
      bookshelf_name: bookshelf.label,
      username: bookshelf.user.username,
      userId: bookshelf.user.id,
      bookshelf_description: bookshelf.description,
      tags: bookshelf.tags.map((tag) =>
        languageStore.language === LanguageEnum.Chinese ? tag.nameChinese : tag.nameEnglish
      )
    })
  )

  const handleTableChange: TableProps<DataType>['onChange'] = (_, filters) => {
    if (filters.bookshelf_name !== null) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          bookshelfName: filters.bookshelf_name[0] as string
        }
      })
    } else if (filters.tags !== null) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          select: languageStore.language === LanguageEnum.Chinese ? 'nameEnglish' : 'nameChinese',
          value: filters.tags as Array<string>
        }
      })
    }
    if (filters.tags !== null) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          select: undefined
        }
      })
    }
    if (filters.bookshelf_name === null) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          bookshelfName: undefined
        }
      })
    }
  }
  return (
    <>
      <Table<DataType>
        className="max-h-[50%] max-w-[90%]"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{ y: 700, x: 400 }}
        pagination={{
          current: tableParams.pagination.page,
          onChange: onChange,
          total: publicBookshelfQuery?.data?.totalPages,
          defaultPageSize: tableParams.pagination.limit
        }}
      />
    </>
  )
}
