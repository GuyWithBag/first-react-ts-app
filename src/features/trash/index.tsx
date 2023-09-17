import React from 'react'
import ToDoTile from '../todos/components/ToDoTile'
import { Box, Text } from '@chakra-ui/react'
import { useTrashStore } from '../../data/TrashStore'

type Props = {}

export default function Trash({}: Props) {
  // const [ toDosList, setToDosList ] = useSt
  const trash = useTrashStore(store => store.trash)

  return (
    <Box className='flex flex-col gap-5'>
      {trash.map( task => {
        return (
          <ToDoTile data={task} isTrash /> 
        )
      })}
    </Box>
  )
}

