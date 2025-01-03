import { updateBookShelfPositionMutation } from '@/features/bookshelf'
import { BookShelfType, TagType } from '@/shared/types'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { message } from 'antd'
import lodash from 'lodash'

interface SortableProps {
  originItems: BookShelfType[]
  setOriginItems: React.Dispatch<React.SetStateAction<BookShelfType[]>>
  children: JSX.Element
}

interface SortableItemProps {
  item: PositionProps
  id: number
  MoveItem: React.ComponentType<any>
}

interface PositionProps {
  position: number
  id: number
}

export function SortableItem({ item, MoveItem }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative"
    >
      <MoveItem move={listeners} />
    </li>
  )
}

export function Sortable({ originItems, setOriginItems, children }: SortableProps) {
  let sensors = useSensors()
  if (window.innerWidth >= 400) {
    sensors = useSensors(useSensor(PointerSensor))
  } else {
    sensors = useSensors(useSensor(TouchSensor))
  }

  const showMessage = lodash.throttle((data) => {
    message.success(data.data.message)
  }, 1000 * 10)

  const { mutate } = updateBookShelfPositionMutation(showMessage)

  const downloadFiledebounce = lodash.debounce((updatedItems) => {
    updatedItems.map((item: BookShelfType, index: number) => {
      if (item.position === index + 1) {
        return
      } else {
        item.position = index + 1
        const tags: number[] = []
        if (item?.tags) {
          for (let i = 0; i < item?.tags?.length; i++) {
            tags.push((item?.tags[i] as TagType).id)
          }
        }
        mutate({
          ...item,
          tags: tags,
          bookShelfName: item.label
        })
      }
    })
  }, 3000)

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={originItems}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active.id !== over?.id) {
      setOriginItems((items) => {
        const oldIndex = items.findIndex((item) => active.id === item.id)
        const newIndex = items.findIndex((item) => over?.id === item.id)
        const updatedItems = arrayMove(items, oldIndex, newIndex)

        downloadFiledebounce(updatedItems)

        return updatedItems
      })
    }
  }
}
