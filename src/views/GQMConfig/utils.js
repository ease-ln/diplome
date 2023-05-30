const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone
  return result
}

const grid = 24

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  minWidth: `15vw`,
  textAlign: 'center',
  padding: grid * 2,
  margin: `1.5em ${grid}px 0 0`,
  boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#F0F3F5',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = (isDraggingOver, isEmpty) => ({
  // border: '1px solid lightgrey',
  maxWidth: `100vw`,
  display: 'flex',
  flexWrap: 'wrap',
  padding: grid,
  overflow: 'auto',
  minHeight: isEmpty ? '45px' : 'NaN',
})

export { getListStyle, getItemStyle, grid, move, reorder }
