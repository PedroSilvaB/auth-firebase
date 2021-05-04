import { createContext, useEffect, useState } from 'react';
import firebase from '../lib/firebase';
import auth from '../services/auth';

interface User {
    email: string, password: string
}
interface AuthContextData {
    signed: boolean,
    user: object,
    loading: boolean,
    signIn({ }: User): Promise<void>,
    signOut(): void,
    sendPasswordResetEmail(email: string): Promise<any>,
    signUp({ }: User)
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storegedUser = localStorage.getItem("@PKAuth:user")
        const storegedToken = localStorage.getItem("@PKAuth:token")
        if (storegedUser && storegedToken) {
            setUser(JSON.parse(storegedUser))
            setLoading(false)
        } else if (loading && !storegedUser && !storegedToken) {
            setLoading(false)
        }
    }, [])

    const signIn = async ({ email, password }) => {
        try {
            setLoading(true);
            await firebase
                .auth().signInWithEmailAndPassword(email, password)
                .then((response) => {
                    localStorage.setItem("@PKAuth:user", JSON.stringify(response.user))
                    localStorage.setItem("@PKAuth:token", response.user.uid)
                    setUser(response.user)
                    console.log(response)
                })

        } catch (error) {
            console.log(error)
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
            console.log(error)
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

    /* const confirmPasswordReset = (password, code) => {
        const resetCode = code || getFromQueryString('oobCode');

        return firebase
            .auth()
            .confirmPasswordReset(resetCode, password)
            .then(() => {
                return true;
            });
    }; */

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
            console.log(error)
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
            signUp
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;