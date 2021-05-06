import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../contexts/AuthContext"
import { LayoutProvider } from "../contexts/LayoutContext"
import { RouteProvider } from "../contexts/RouteContext"
function MyApp({ Component, pageProps }) {
  return <ChakraProvider resetCSS>
    <AuthProvider>
      <LayoutProvider>
        <RouteProvider>
          <Component {...pageProps} />
        </RouteProvider>
      </LayoutProvider>
    </AuthProvider>
  </ChakraProvider>
}

export default MyApp
