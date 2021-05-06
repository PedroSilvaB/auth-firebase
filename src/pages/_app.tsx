import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../contexts/AuthContext"
import { LayoutProvider } from "../contexts/LayoutContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { PrivateRoute } from "../contexts/PrivateRoute"
function MyApp({ Component, pageProps }) {
  return <ChakraProvider resetCSS>
    <AuthProvider>
      <LayoutProvider>
        <Router>
          <Switch>
            <Route path="/">
              <Component {...pageProps} />
            </Route>
            <Route path="/login">
              <Component {...pageProps} />
            </Route>
            <PrivateRoute path="/dashboard">
              <Component {...pageProps} />
            </PrivateRoute>
          </Switch>
        </Router>
      </LayoutProvider>
    </AuthProvider>
  </ChakraProvider>
}

export default MyApp
