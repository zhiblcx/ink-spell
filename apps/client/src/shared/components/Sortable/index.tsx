import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

interface SortableProps {
  originItems: PositionProps[]
  children: JSX.Element
}

interface SortableItemProps {
  item: PositionProps
  id: number
  MoveItem: React.ComponentType
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
      <MoveItem />
    </li>
  )
}

function Sortable({ originItems, children }: SortableProps) {
  const [items, setItems] = useState(originItems)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event
    setItems(originItems)
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}

export default Sortable
