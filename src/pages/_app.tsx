import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../contexts/AuthContext"
import { LayoutProvider } from "../contexts/LayoutContext"
import { RouterProvider } from "../contexts/RouterContext"

function MyApp({ Component, pageProps }) {
  return <ChakraProvider resetCSS>
    <AuthProvider>
      <RouterProvider>
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </RouterProvider>
    </AuthProvider>
  </ChakraProvider>
}

export default MyApp
