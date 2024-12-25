import { PublicBookshelfDao, selectPublicBookShelfQuery } from '@/features/bookshelf'
import { getAllTagQuery } from '@/features/tag'
import { DEFAULT_TAG_COLORS } from '@/shared/constants/app'
import { useLanguageStore } from '@/shared/store'
import { TagType } from '@/shared/types'
import { UrlUtils } from '@/shared/utils'
import { FilterFilled, SearchOutlined } from '@ant-design/icons'
import type { PaginationProps, TableColumnType } from 'antd'
import { Input, Table, TableProps } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { DataIndex, DataType, tableParamsType } from './types'

export function BookStoreTable() {
  const languageStore = useLanguageStore()
  const { t } = useTranslation(['AUTH', 'COMMON', 'PROMPT'])
  const [tableParams, setTableParams] = useState<tableParamsType>({
    pagination: {
      page: PaginationParamsEnum.PAGE,
      limit: PaginationParamsEnum.LIMIT,
      select: undefined,
      value: undefined,
      bookshelfName: undefined
    }
  })
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const router = useRouter()
  const { data: allTagQuery } = getAllTagQuery()
  const { data: publicBookshelfQuery, isLoading } = selectPublicBookShelfQuery(
    tableParams.pagination.page,
    tableParams.pagination.limit,
    tableParams.pagination.select,
    tableParams.pagination.value,
    tableParams.pagination.bookshelfName
  )

  const onChange: PaginationProps['onChange'] = (page) => (tableParams.pagination.page = page)

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
      width: 100,
      ellipsis: true,
      ...getColumnSearchProps('bookshelf_name')
    },
    {
      title: t('AUTH:username'),
      dataIndex: 'username',
      width: 100,
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
      title: t('COMMON:cover'),
      dataIndex: 'cover',
      width: 120,
      render: (_, { cover }) => (
        <img
          className="w-20"
          src={import.meta.env.VITE_SERVER_URL + cover}
        />
      )
    },
    {
      title: t('COMMON:bookshelf_tag'),
      dataIndex: 'tags',
      width: 200,
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
            const color = DEFAULT_TAG_COLORS[Number(key + index * 2) % DEFAULT_TAG_COLORS.length]
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
      width: 300
    }
  ]

  const data: DataType[] = publicBookshelfQuery?.data?.items?.map(
    (bookshelf: PublicBookshelfDao) => ({
      key: bookshelf.id,
      bookshelf_name: bookshelf.label,
      username: bookshelf.user.username,
      userId: bookshelf.user.id,
      bookshelf_description: bookshelf.description ?? t('COMMON:no_description'),
      tags: bookshelf.tags.map((tag) =>
        languageStore.language === LanguageEnum.Chinese ? tag.nameChinese : tag.nameEnglish
      ),
      cover: bookshelf.cover
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
    <div className="absolute w-[85%]">
      <Table<DataType>
        tableLayout="fixed"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{ x: '100%', y: 100 * 5 }}
        size="middle"
        pagination={{
          onChange: onChange,
          defaultCurrent: tableParams.pagination.page,
          position: ['none', 'bottomCenter'],
          hideOnSinglePage: true,
          showQuickJumper: true,
          total: publicBookshelfQuery?.data?.totalPages * tableParams.pagination.limit,
          defaultPageSize: tableParams.pagination.limit
        }}
      />
    </div>
  )
}
