import { Button } from "@chakra-ui/button"
import { Box, Flex, Stack } from "@chakra-ui/layout"
import useAuth from "../../hooks/useAuth"
import Link from 'next/link'
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Input } from "@chakra-ui/input"

export default function Dashboard() {
  const { signOut, signed, loading, sendPasswordResetEmail, sendEmailVerification } = useAuth()
  const [email, setEmail] = useState()
  const { push } = useRouter()

  useEffect(() => {
    if (!(signed || loading)) {
      push('/login')
    }
  }, [signed, loading])

  function handleSingOut() {
    signOut()
  }
  function handleOnChange(e) {
    setEmail(e.target.value)
  }
  function handleSendEmailPasswordReset() {
    sendPasswordResetEmail(email)
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex flex="1" h="100%" w="100vw" justifyContent="space-between" alignItems="center">
        <Stack as="nav" spacing={4} w="25vw" h="100%" >
          <Box as="header">Dashboard</Box>
          <Link href="/dashboard/signup">
            <Button cursor="pointer" as="a">
              New User
            </Button>
          </Link>
        </Stack>
        <Stack as="nav" spacing={4} w="100%" mx="6rem">
          <Input type="email" onChange={handleOnChange}></Input>
          <Button onClick={handleSendEmailPasswordReset}>Reset Password</Button>
          <Button onClick={handleSingOut}>Sing Out</Button>
          <Button onClick={sendEmailVerification}>Verificar email</Button>

          <Link as={"/dashboard/users"} href="/dashboard/[...slug]">
            <a>Users</a>
          </Link>

        </Stack>
      </Flex>
    </>
  )
}