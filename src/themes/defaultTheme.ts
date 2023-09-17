import { extendTheme } from "@chakra-ui/react"

import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  label: {
    fontFamily: 'mono', // change the font family of the label
  },
  control: {
    padding: 3, // change the padding of the control
    borderRadius: 0, // change the border radius of the control
  },
})

let checkboxTheme = defineMultiStyleConfig({ baseStyle })

export const defaultTheme: Record<string, any> = extendTheme({
    colors: {
      pallete: {
        100: "#071952", 
        200: "#088395", 
        300: "#35A29F", 
        400: "#F2F7A1"
      } 
    },
    components: {
      Checkbox: checkboxTheme
    }
  })