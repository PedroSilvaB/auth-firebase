import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, Link as ExternalLink, Stack } from '@chakra-ui/layout'
import { Tooltip } from '@chakra-ui/tooltip'
import { GetStaticProps } from 'next'
import Head from 'next/head'

export default function Home({ gitHub }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex flex="1" flexDir="column" h="110vh" justifyContent="space-evenly" alignItems="center">
        <Heading fontWeight="500" fontSize={["4xl", "6xl"]}>🐱‍🏍 | Bem vindo</Heading>
        <Tooltip label="GitHub" placement="auto">
          <Stack rounded="md" p="5" bgGradient="linear(to-b, blue.900, black)" alignItems="center" spacing={4} as={ExternalLink} _hover={{ textDecoration: "none", boxShadow: "xl" }} href={gitHub.html_url} isExternal>
            <Image rounded="full" src={gitHub.avatar_url} width={100} height={100}></Image>
            <Box>
              <Heading>{gitHub.name}</Heading>
              <Heading as="h3" fontSize="xl" fontWeight="light" color="whiteAlpha.700">{gitHub.login}</Heading>
            </Box>
          </Stack>
        </Tooltip>
      </Flex>
    </>)
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const response = await fetch("https://api.github.com/users/PedroSilvaB").then((res) => {
      return res.json()
    })
    return {
      props: { gitHub: response },
      revalidate: 10
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}