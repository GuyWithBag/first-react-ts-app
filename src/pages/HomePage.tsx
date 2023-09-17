import React from 'react'
import ToDos from '../features/todos'
import { Box } from '@chakra-ui/react'

type Props = {}

export default function Home({}: Props) {
  return (
    <Box className='p-10'>
      <ToDos /> 
    </Box>
  )
}

