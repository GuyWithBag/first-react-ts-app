import React from 'react'
import NavbarButton from './components/NavbarButton'
import { defaultTheme } from '../../themes/defaultTheme'
import { AiOutlinePlus } from 'react-icons/ai'
import { 
  Button, 
  useDisclosure, 
  Box
} from '@chakra-ui/react'
import AddTaskModal from './components/AddTaskModal'

type Props = {}

export default function NavBar({}: Props) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <AddTaskModal isOpen={isOpen} onClose={onClose}/>
      <nav className='text-white h-16 flex items-center p-5 fixed w-[100%] bg-[#088395] shadow-md'>
          <Box className='flex flex-row gap-5 items-center justify-between w-[100%]'>
              <h1 className="text-2xl font-bold font-white ">To Do App</h1>
              <Box className='flex flex-row-reverse gap-5 items-center'>
                  <Button onClick={onOpen}>
                    <AiOutlinePlus />
                  </Button>
                  <NavbarButton text="Home" to="/"/>
                  <NavbarButton text="Recently Deleted" to="/Trash"/>
              </Box>
          </Box>
      </nav>
    </>
  )
}

