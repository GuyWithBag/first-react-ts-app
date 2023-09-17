import { Box } from '@chakra-ui/react'
import React from 'react'
import Trash from '../features/trash'

type Props = {}

export default function TrashPage({}: Props) {
  return (
    <Box className='p-10'>
      <Trash />
    </Box>
  )
}

