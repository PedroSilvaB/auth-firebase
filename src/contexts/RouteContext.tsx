import { Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'

const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
    const { signed, loading } = useAuth()
    const [restricted, setRestricted] = useState(false)
    const { push, pathname, replace } = useRouter()
    useEffect(() => {
        switch (pathname.split("/")[1]) {
            case "dashboard":
                setRestricted(true)
                if (!signed && !loading) {
                    replace("/login")
                }
                break;
            case "login":
                setRestricted(true)
                if (signed && !loading) {
                    push("/dashboard")
                }
                break
            default:
                break;
        }
    }, [signed, loading, push])
    if (loading && restricted) {
        return (
            <Flex flex="1" bg="black" w="100vw" color="white" justifyContent="center" alignItems="center" h="100vh">
                <Heading fontWeight="900" fontSize={["4xl", "6xl"]}>🐱‍🏍 | Bem vindo ...</Heading>
            </Flex>
        )
    }

    return (
        <RouteContext.Provider value={{}}>
            {children}
        </RouteContext.Provider>
    )
}
