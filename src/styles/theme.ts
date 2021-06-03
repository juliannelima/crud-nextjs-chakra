import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      700: "#2d333b",
      800: "#22272e",
    },

  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.800",
        color: props.colorMode === "light" ? "gray.600" : "gray.100"
      }
    })
  }
})
