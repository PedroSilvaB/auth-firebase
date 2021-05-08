import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Divider, Flex, Heading, Stack } from "@chakra-ui/layout"
import React, { FormEvent, useState } from "react"
import { FaArrowRight } from 'react-icons/fa'
import Head from 'next/head'
import useAuth from "../../hooks/useAuth"
import { useToast } from "@chakra-ui/toast"

const SignUp = () => {
    const { signUp } = useAuth()
    const [user, setUser] = useState<{ email: string, newPassword: string }>()
    const toast = useToast()

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = JSON.parse(`{"${event.target.id}":"${event.target.value}"}`)
        setUser({ ...user, ...value })
        console.log(user)
    }
    const handleSubmit = (event: FormEvent) => {
        try {
            event.preventDefault()
            const { email, newPassword } = user

            signUp({ email, password: newPassword })
            toast({
                title: user.email,
                description: "Usuario criado!",
                status: "success",
                position: "bottom-left",
                duration: 10000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: "Algo deu errado",
                description: error.message,
                status: "error",
                position: "bottom-left",
                duration: 10000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Flex w="100vw" h="90vh" bg="black" color="white" justifyContent="center" alignItems="center">

                <Stack as="form" onChange={handleOnChange} onSubmit={handleSubmit} justifyContent="space-evenly" spacing={6} w="30rem" shadow="xl" p={["2rem", "4rem"]} m="1rem" rounded="5" bg="whiteAlpha.100" >

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