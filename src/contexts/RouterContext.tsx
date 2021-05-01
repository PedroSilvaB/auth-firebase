import { Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const RouterContext = createContext(null);


export const RouterProvider = ({ children, Component }) => {
    const { signed, loading, } = useAuth()
    const { push,prefetch } = useRouter()

    if (loading) {
        return <Flex flex="1" bg="black" w="100vw" color="white" justifyContent="center" alignItems="center" h="100vh"><Heading fontWeight="900" fontSize={["4xl", "6xl"]}>🐱‍🏍 | Bem vindo ...</Heading></Flex>
    }
    if (Component.name == "Dashboard" && !signed) {
        push("/login")
    }
    if (Component.name == "Login" && signed) {
        push("/dashboard")
    }

    return (
        <RouterContext.Provider value={{ dash: signed && Component.name == "Dashboard" }}>
            <Layout>
                {children}
            </Layout>
        </RouterContext.Provider>
    )
}



const useRoute = () => useContext(RouterContext);

export default useRoute;