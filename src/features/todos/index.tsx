import React from 'react'
import ToDoTile from './components/ToDoTile'
import { useTasksStore } from '../../data/TasksStore'
import { Box, Text } from '@chakra-ui/react'

type Props = {}

export default function ToDos({}: Props) {
  // const [ toDosList, setToDosList ] = useSt
  const tasks = useTasksStore(store => store.tasks)
  return (
    <Box className='flex flex-col gap-5'>
      {tasks.map( task => {
        return (
          <ToDoTile data={task}/> 
        )
      })}
      {/* <Box className='flex flex-col items-center justify-between'>
        <Box className=' bg-red-500 w-[100%]'><Text>MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmmmmmmmmmmmmmmmmmmmmmmm</Text></Box>
      </Box> */}
    </Box>
  )
}

