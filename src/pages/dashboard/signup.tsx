import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Link, Stack } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import { FaArrowRight } from 'react-icons/fa'
import Head from 'next/head'
import useAuth from "../../hooks/useAuth"
import { useRouter } from "next/router"

const SignUp = () => {
    const { signIn, signUp } = useAuth()
    const { prefetch, push } = useRouter()

    const handleChange = (event) => {

    }
    const handleSubmit = (event) => {
        try {
            event.preventDefault()
            const [{ email }, { newPassword }] = [...event.currentTarget].filter(({ tagName, id }) => tagName == "INPUT" && id).map(({ id, value }) => JSON.parse(`{"${id}":"${value}"}`))
            signUp({ email, password: newPassword })
        } catch (error) {
            console.log(error)
        } finally {
        }
    }
    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Flex w="100vw" h="90vh" bg="black" color="white" justifyContent="center" alignItems="center">

                <Stack as="form" onChange={handleChange} onSubmit={handleSubmit} justifyContent="space-evenly" spacing={6} w="30rem" shadow="xl" p={["2rem", "4rem"]} m="1rem" rounded="5" bg="whiteAlpha.100" >

                    <Heading fontWeight="700" fontSize="6xl">Sign Up</Heading>

                    <Input placeholder="Email" shadow="md" isRequired id="email" type="email" />
                    <Input placeholder="Senha" shadow="md" isRequired id="newPassword" type="password" name="newPassword" />
                    <Button fontSize="lg" type="submit" bgGradient="linear(7deg, blue.700, blue.500,blue.300)" shadow="md" p="6" rounded="full" _focus={{ bg: "blue.700" }} _hover={{ bg: "blue.700" }} rightIcon={<FaArrowRight />}>Confirm</Button>
                    <Divider />
                </Stack>
            </Flex>
        </>
    )
}

export default SignUp