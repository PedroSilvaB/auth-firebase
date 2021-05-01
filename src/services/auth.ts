interface Response{
    token: string,
    user: {
        name: string,
        email: string
    }
}

const auth = (): Promise<Response> => (new Promise((resolve) => setTimeout(() => resolve({ token: "aukbalrbhlbagjhbrl", user:{
    name: "Pedro",
    email: "pedrosilva9030@gmail.com"
} }), 2000)))

export default auth