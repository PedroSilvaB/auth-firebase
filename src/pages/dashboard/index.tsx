import { Button } from "@chakra-ui/button"
import { Flex } from "@chakra-ui/layout"
import useAuth from "../../hooks/useAuth"
import Link from 'next/link'
import Head from "next/head"
export default function Dashboard() {
  const { singOut } = useAuth()

  function handleSingOut() {
    singOut()
  }
  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <Flex flex="1" h="100vh" justifyContent="space-around" alignItems="center">
      <Button onClick={handleSingOut}>Sing Out</Button>
      <Link as={"/dashboard/users"} href="/dashboard/[...slug]">
        <a>Users</a>
      </Link>
    </Flex>
    </>
  )
}