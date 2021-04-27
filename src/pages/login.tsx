import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Input } from "@chakra-ui/input"
import { AspectRatio, Divider, Flex, Heading, Link, Stack } from "@chakra-ui/layout"

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
    return (
        <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
            <Stack as="form" onChange={form} onSubmit={forms} spacing={5} w="30rem" shadow="xl" p={["3rem", "5rem"]} m="1rem" rounded="5" bg="whiteAlpha.300" >
                <AspectRatio ratio={16 / 9}>
                    <Image src="https://vignette.wikia.nocookie.net/naruto/images/d/dc/Naruto's_Sage_Mode.png/revision/latest?cb=20150124180545" rounded="5" alt="naruto" objectFit="cover" />
                </AspectRatio>
                <Heading>Login</Heading>

                <Input placeholder="Email" id="email" type="email" />
                <Input placeholder="Senha" id="password" type="password" />
                <Button type="submit" bg="blue.600">Sing</Button>

                <Divider />
                <Link>Esquece?</Link>
            </Stack>
        </Flex>
    )
}

export default Login