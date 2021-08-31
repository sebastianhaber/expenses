import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    cssVarPrefix: "expenses",
  },
  fonts: {
    body: 'Inter',
    heading: 'Inter',
    mono: 'Inter',
  }
});

ReactDOM.render(
  <>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
    </React.StrictMode>
  </>,
  document.getElementById('root')
);

