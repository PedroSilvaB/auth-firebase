import { Flex, Heading } from '@chakra-ui/layout';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex flex="1" flexDir="column" h="110vh" justifyContent="center" alignItems="center">

        <Heading fontWeight="500" fontSize={["4xl", "6xl"]}>🐱‍🏍 | Bem vindo</Heading>

      </Flex>
    </>)
}