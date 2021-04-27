import { ChakraProvider } from "@chakra-ui/react"

const theme = {
  
}

function MyApp({ Component, pageProps }) {
  return <ChakraProvider resetCSS>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
