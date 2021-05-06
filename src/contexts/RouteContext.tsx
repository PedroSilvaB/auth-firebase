import { useRouter } from 'next/router'
import { createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth'

const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
    const { signed, loading } = useAuth()
    const { push, pathname, replace } = useRouter()
    useEffect(() => {
        switch (pathname.split("/")[1]) {
            case "dashboard":
                if (!signed && !loading) {
                    replace("/login")
                }
                break;
            case "login":
                if (signed && !loading) {
                    push("/dashboard")
                }
                break
            default:
                break;
        }
    }, [signed, loading])
    return (
        <RouteContext.Provider value={{}}>
            {children}
        </RouteContext.Provider>
    )
}
