import useAuth from '../hooks/useAuth';
import {
    Route,
    Redirect
} from "react-router-dom"
export const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
