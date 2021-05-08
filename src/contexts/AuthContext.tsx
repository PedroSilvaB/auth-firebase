import { createContext, useEffect, useState } from 'react';
import firebase from '../lib/firebase'
import { UpdateProfile, User } from "../interface"

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

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((res) => {
            if (res) {
                setUser(res)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        })

        return () => unsubscribe();
    }, [])

    const updateProfile = async (profile: UpdateProfile) => {
        firebase
            .auth()
            .currentUser
            .updateProfile({
                ...profile
            }).then(() => {
                setUser({ ...user, ...profile })
            }).catch((error) => {
                throw error
            })
    }

    const signIn = async ({ email, password }) => {
        try {
            setLoading(true);
            await firebase
                .auth().signInWithEmailAndPassword(email, password)
                .then((response) => {
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
                })
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const sendPasswordResetEmail = async (email) => {
        try {
            return await firebase
                .auth()
                .sendPasswordResetEmail(email)
        } catch (error) {
            throw error
        }
    }

    const sendEmailVerification = async () => {
        firebase.auth()
            .currentUser
            .sendEmailVerification()
            .then((res) => {
                return res
            }).catch((error) => {
                throw error
            })
    }

    const signOut = async () => {
        try {
            setLoading(true)
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    setUser(null)
                })
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
            sendPasswordResetEmail,
            signUp,
            sendEmailVerification,
            updateProfile,
            signed: !!user,
            user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;