import { Flex, Grid } from '@chakra-ui/layout'
import Link from 'next/link'
import useAuth from '../../hooks/useAuth'
import PerfilMenu from '../ProfileMenu'


const Layout = ({ children }: { children: any }) => {
    const { signed } = useAuth()
    return (
        <Grid maxW="100vw" minH="100vh">
            <Flex gridColumnStart="1" gridColumnEnd="10" h="10vh" gridRowStart="1" gridRowEnd="2">
                <Flex w="full" justifyContent="space-between" px={5} alignItems="center" zIndex="1" bg="whiteAlpha.300">

                    <Link href="/"><a>Home</a></Link>
                    {signed ? <Link href="/dashboard"><a>Dashboard</a></Link> : <></>}
                    {signed ? <PerfilMenu/> : <></>}

                </Flex>
            </Flex>
            <Flex flexDir="column" h="90vh" gridColumnStart={["2", "3"]} gridColumnEnd={["9", "8"]} gridRowStart="2">
                {children}
                <Flex w="full" h="10vh" display={["flex", "none"]}>
                    <Flex w="full" h="10vh" left="0" bottom="0" justifyContent="space-around" alignItems="center" zIndex="1" position="fixed" bg="whiteAlpha.300"></Flex>
                </Flex>
            </Flex>
        </Grid>
    )

}
export default Layout