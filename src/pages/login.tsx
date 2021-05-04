import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Link, Stack } from "@chakra-ui/layout"
import React, { useEffect, useState } from "react"
import { FaArrowRight } from 'react-icons/fa'
import Head from 'next/head'
import useAuth from "../hooks/useAuth"
import { useRouter } from "next/router"
import { useDisclosure } from "@chakra-ui/hooks"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { useToast } from "@chakra-ui/toast"

const Login = () => {
    const { signIn, sendPasswordResetEmail } = useAuth()
    const { prefetch, push } = useRouter()
    const [user, setUser] = useState<{ email: string, password: string }>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const initialRef = React.useRef()
    const handleOnChange = (event) => {
        const value = JSON.parse(`{"${event.target.id}":"${event.target.value}"}`)
        setUser({ ...user, ...value })
        console.log(user)
    }
    const handleSendPasswordReset = async () => {
        try {
            onClose()
            await sendPasswordResetEmail(user.email)
            toast({
                title: "Enviado para " + user.email,
                description: "Verifique seu email.",
                status: "success",
                position: "bottom-left",
                duration: 10000,
                isClosable: true,
            })
        } catch (error) {
            console.error(error.message)
            toast({
                title: "Email invalido " + user.email,
                description: "Verifique seu email.",
                status: "error",
                position: "bottom-left",
                duration: 10000,
                isClosable: true,
            })
        }
    }
    const handleSubmit = (event) => {
        try {
            event.preventDefault()
            const { email, password } = user
            signIn({ email, password })
        } catch (error) {
            console.log(error)
        } finally {
            push("/dashboard")
        }
    }
    useEffect(() => {
        // Prefetch the dashboard page
        prefetch('/dashboard')
    }, [])
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Flex w="100vw" h="90vh" bg="black" color="white" justifyContent="center" alignItems="center">

                <Stack as="form" onChange={handleOnChange} onSubmit={handleSubmit} justifyContent="space-evenly" spacing={6} w="30rem" shadow="xl" p={["2rem", "4rem"]} m="1rem" rounded="5" bg="whiteAlpha.100" >

                    <Heading fontWeight="700" fontSize="6xl">Login</Heading>

                    <Input placeholder="Email" shadow="md" isRequired id="email" type="email" />
                    <Input placeholder="Senha" shadow="md" isRequired id="password" type="password" name="password" />
                    <Button fontSize="lg" type="submit" bgGradient="linear(7deg, blue.700, blue.500,blue.300)" shadow="md" p="6" rounded="full" _focus={{ bg: "blue.700" }} _hover={{ bg: "blue.700" }} rightIcon={<FaArrowRight />}>Sing</Button>
                    <Divider />
                    <Box>
                        <Link as="span" rounded="5" fontSize="lg" px="1" onClick={onOpen}>Esquece!</Link>
                        <Modal
                            initialFocusRef={initialRef}
                            isOpen={isOpen}
                            isCentered
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Rest Password</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl as="form" onChange={handleOnChange}>
                                        <FormLabel>Confirm Email</FormLabel>
                                        <Input ref={initialRef} defaultValue={user?.email} id="email" placeholder="Email" />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" onClick={handleSendPasswordReset} mr={3}>
                                        Enviar
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default Login