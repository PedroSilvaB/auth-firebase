import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Input } from "@chakra-ui/input"
import { AspectRatio, Box, Divider, Flex, Heading, Link, Stack } from "@chakra-ui/layout"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { FaArrowRight } from 'react-icons/fa'
interface Values {
    password: string,
    email: string
}

const form = (event) => {
    event.preventDefault()
    if (event.target.tagName == "INPUT" && event.target.id) {
        console.log(JSON.parse(`{"${event.target.id}":"${event.target.value}"}`))
    }

}
const forms = (event) => {
    event.preventDefault()
    const id = [...event.currentTarget].filter(({ tagName, id }) => tagName == "INPUT" && id).map(({ id, value }) => JSON.parse(`{"${id}":"${value}"}`))
    console.log(id)
}
const Login = ({ }) => {
    const router = useRouter()
    const user = true
    const loading = true
    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        router.push('/')
    }, [])

    useEffect(() => {
        // Prefetch the page
        router.prefetch('/')
    }, [user, loading])
    return (
        <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">

            <Stack as="form" onChange={form} onSubmit={handleSubmit} justifyContent="space-evenly" spacing={5} w="30rem" minH="80vh" shadow="xl" p={["3rem", "5rem"]} m="1rem" rounded="5" bg="whiteAlpha.100" >

                <Heading>Login</Heading>

                <Input placeholder="Email" shadow="md" isRequired id="email" type="email" />
                <Input placeholder="Senha" shadow="md" isRequired id="password" type="password" />
                <Button fontSize="lg" type="submit" bgGradient="linear(7deg, blue.700, blue.500,blue.300)" shadow="md" p="6" rounded="full" _focus={{ bg: "blue.700" }} _hover={{ bg: "blue.700" }} rightIcon={<FaArrowRight />}>Sing</Button>

                <Divider />
                <Box>
                    <Link rounded="5" fontSize="lg" px="1" href="/">Esquece?</Link>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login