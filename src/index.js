import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { extendTheme, ThemeProvider, ChakraProvider } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    cssVarPrefix: 'xpns',
    initialColorMode: 'dark'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

