import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Link, Stack } from "@chakra-ui/layout"
import React from "react"
import { FaArrowRight } from 'react-icons/fa'
import Head from 'next/head'
import useAuth from "../hooks/useAuth"
const forms = (event) => {
    event.preventDefault()
    const [{ email }, { password }] = [...event.currentTarget].filter(({ tagName, id }) => tagName == "INPUT" && id).map(({ id, value }) => JSON.parse(`{"${id}":"${value}"}`))
    console.log({ email, password })
}
const Login = () => {
    const { signed, signIn } = useAuth()
    const handleChange = (event) => {

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const [{ email }, { password }] = [...event.currentTarget].filter(({ tagName, id }) => tagName == "INPUT" && id).map(({ id, value }) => JSON.parse(`{"${id}":"${value}"}`))
        signIn({email, password})
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Flex w="100vw" h="90vh" bg="black" color="white" justifyContent="center" alignItems="center">

                <Stack as="form" onChange={handleChange} onSubmit={handleSubmit} justifyContent="space-evenly" spacing={5} w="30rem" shadow="xl" p={["2rem", "4rem"]} m="1rem" rounded="5" bg="whiteAlpha.100" >

                    <Heading fontWeight="700" fontSize="6xl">Login</Heading>

                    <Input placeholder="Email" shadow="md" isRequired id="email" type="email" />
                    <Input placeholder="Senha" shadow="md" isRequired id="password" type="password" />
                    <Button fontSize="lg" type="submit" bgGradient="linear(7deg, blue.700, blue.500,blue.300)" shadow="md" p="6" rounded="full" _focus={{ bg: "blue.700" }} _hover={{ bg: "blue.700" }} rightIcon={<FaArrowRight />}>Sing</Button>
                    <Divider />
                    <Box>
                        <Link rounded="5" fontSize="lg" px="1" href="/">Esquece?</Link>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default Login