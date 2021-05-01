import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../contexts/AuthContext"
import { LayoutProvider } from "../contexts/LayoutContext"
import { RouterProvider } from "../contexts/RouterContext"

function MyApp({ Component, pageProps }) {
  return <ChakraProvider resetCSS>
    <AuthProvider>
      <RouterProvider Component={Component}>
          <Component {...pageProps} />
      </RouterProvider>
    </AuthProvider>
  </ChakraProvider>
}

export default MyApp
