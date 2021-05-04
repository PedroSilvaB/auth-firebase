import { Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const RouterContext = createContext(null);


export const RouterProvider = ({ children }) => {
    const { loading, signed } = useAuth()
    const { push, pathname } = useRouter()
    useEffect(()=>{
        if(pathname.match(/^\/dashboard/g) && !signed && !loading){
            push("/login")
        }
    },[loading, signed])
    
    if (loading) {
            return <Flex flex="1" bg="black" w="100vw" color="white" justifyContent="center" alignItems="center" h="100vh"><Heading fontWeight="900" fontSize={["4xl", "6xl"]}>🐱‍🏍 | Bem vindo ...</Heading></Flex>
    }
    
    return (
        <RouterContext.Provider value={{}}>
            {children}
        </RouterContext.Provider>
    )
}



const useRoute = () => useContext(RouterContext);

export default useRoute;