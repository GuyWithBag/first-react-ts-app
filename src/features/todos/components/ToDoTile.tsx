import { 
  Button, 
  Checkbox, 
  CheckboxGroup, 
  Box,
  IconButton, 
  Text,
  Icon
} from '@chakra-ui/react'
import React from 'react'
import { Task } from '../../../utils/task'
import { AiOutlineDelete } from 'react-icons/ai'
import { useTasksStore } from '../../../data/TasksStore'
import { BsDot } from 'react-icons/bs' 
import { useTrashStore } from '../../../data/TrashStore'

type Props = {
    data: Task, 
    isTrash?: boolean
} 

export default function ToDoTile({ data, isTrash }: Props) {
  let storeDeleteTask  = useTasksStore(store => store.deleteTask)
  let checkTask = useTasksStore(store => store.checkTask)
  let deleteTrash = useTrashStore(store => store.deleteTrash)
  let restoreTrash = useTrashStore(store => store.restoreTrash)

  function deleteTask(id: string) {
    if (isTrash === true) {
      deleteTrash(id)
      return
    }
    storeDeleteTask(id)
  }

  return (
    <Box className='p-5 px-14 text-xl flex justify-between rounded-xl shadow-md w-[100%]' style={{
      backgroundColor: 'hsl(63, 84%, 80%)', 
      transition: "all .5s ease", 
      filter: `${data.checked ? 'saturate(20%)' : ''}`
    }}>
        <Box className={`flex flex-row items-center ${data.checked ? 'line-through' : ""}`}>
          <Icon as={BsDot} boxSize={7} />
          <Text>{data.title}</Text>
        </Box>
        <Box className='flex flex-row gap-6'>
          <Box className={`flex items-center ${isTrash === true ? 'hidden' : ''}`}>
            <Checkbox 
              isChecked={data.checked} 
              
              onChange={(_: React.ChangeEvent<Element>) => {
                checkTask(data.id, !data.checked)
              }}
            /> 
          </Box>
          <IconButton aria-label='Delete' icon={<AiOutlineDelete size={'2em'}/>} variant='ghost' onClick={() => deleteTask(data.id)} />
          <Box className={`${isTrash === true ? '' : 'hidden'}`}>
            <Button className='hidden' onClick={() => restoreTrash(data)}>
                <Text>Restore Task</Text>
            </Button>
          </Box>
        </Box>
    </Box>
  )
}

