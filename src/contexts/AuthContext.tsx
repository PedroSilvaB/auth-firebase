import { createContext, useEffect, useState } from 'react';
import firebase from '../lib/firebase'
import auth from '../services/auth';
import { UpdateProfile, User } from "../interface"
import { Flex, Heading } from '@chakra-ui/layout'
import { useRouter } from 'next/router'

interface UserPassword {
    email: string,
    password: string
}
interface AuthContextData {
    signed: boolean,
    user: User,
    loading: boolean,
    signIn({ }: UserPassword): Promise<void>,
    signOut(): void,
    sendPasswordResetEmail(email: string): Promise<any>,
    signUp({ }: UserPassword): void,
    sendEmailVerification(): Promise<void>,
    updateProfile({ }: UpdateProfile): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)
    const { push, pathname } = useRouter()
    useEffect(() => {
        if (pathname.match(/^\/dashboard/g) && !user && !loading) {
            push("/login")
        }
    }, [loading, user])


    useEffect(() => {
        const storegedUser = localStorage.getItem("@PKAuth:user")
        const storegedToken = localStorage.getItem("@PKAuth:token")
        if (storegedUser && storegedToken) {
            setUser(JSON.parse(storegedUser))
            setLoading(false)
        } else if (loading && !storegedUser && !storegedToken) {
            setLoading(false)
        }
        const unsubscribe = firebase.auth().onAuthStateChanged((res) => {
            if (res) {
                setUser(res);
                console.log(res)
                localStorage.setItem("@PKAuth:user", JSON.stringify(res))
                localStorage.setItem("@PKAuth:token", res.uid)
            } else {
                localStorage.removeItem("@PKAuth:user")
                localStorage.removeItem("@PKAuth:token")
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [])

    if (loading) {
        return <Flex flex="1" bg="black" w="100vw" color="white" justifyContent="center" alignItems="center" h="100vh"><Heading fontWeight="900" fontSize={["4xl", "6xl"]}>🐱‍🏍 | Bem vindo ...</Heading></Flex>
    }

    const updateProfile = async (profile: UpdateProfile) => {
        firebase
            .auth()
            .currentUser
            .updateProfile({
                ...profile
            }).then(function (res) {
                console.log(res)
                setUser({ ...user, ...profile })
            }).catch(function (error) {
                throw error
            })
    }

    const signIn = async ({ email, password }) => {
        try {
            setLoading(true);
            await firebase
                .auth().signInWithEmailAndPassword(email, password)
                .then((response) => {
                    localStorage.setItem("@PKAuth:user", JSON.stringify(response.user))
                    localStorage.setItem("@PKAuth:token", response.user.uid)
                    setUser(response.user)
                })
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    const signUp = ({ email, password }) => {
        try {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    setUser(response.user)
                    localStorage.setItem('@PKAuth:user', JSON.stringify(response.user))
                    return response.user
                });
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    };

    const sendPasswordResetEmail = async (email) => {
        try {
            return await firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    return true;
                });
        } catch (error) {
            throw error
        }

    };
    const sendEmailVerification = async () => {
        firebase.auth()
            .currentUser
            .sendEmailVerification()
            .then(function (res) {
                return res
            }).catch(function (error) {
                throw error
            })
    }

    const signOut = async () => {
        try {
            setLoading(true)
            setLoading(true);
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    localStorage.removeItem("@PKAuth:user")
                    localStorage.removeItem("@PKAuth:token")
                    setUser(null)
                });
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            signed: !!user,
            user,
            loading,
            sendPasswordResetEmail,
            signUp,
            sendEmailVerification,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;