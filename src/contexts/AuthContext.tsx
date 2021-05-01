import { createContext, useEffect, useState } from 'react';
import firebase from '../lib/firebase';
import auth from '../services/auth';


/* export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signin = () => {
        try {
            setLoading(true);
            return firebase
                .auth().signInWithEmailAndPassword(email, password)
                .then((response) => {
                    setUser(response.user);
                    return response.user
                });
        } finally {
            setLoading(false);
        }
    }
    const signout = () => {
        try {
            setLoading(true);
            return firebase
                .auth()
                .signOut()
                .then(() => setUser(false));
        } finally {
            setLoading(false);
        }
    }
    return <AuthContext.Provider value={{
        user,
        loading,
        signin,
        signout
    }}>{children}</AuthContext.Provider>;
} */

interface AuthContextData {
    signed: boolean,
    user: object,
    token: string,
    loading: boolean,
    signIn({ }): Promise<void>,
    singOut(): void
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

    async function signIn(userData) {
        try {
            setLoading(true)
            const response = await auth()
            localStorage.setItem("@PKAuth:user", JSON.stringify(response.user))
            localStorage.setItem("@PKAuth:token", response.token)
            setUser(response.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    function singOut() {
        setLoading(true)
        localStorage.removeItem("@PKAuth:user")
        localStorage.removeItem("@PKAuth:token")
        setUser(null)
        setLoading(false)
    }
    return (
        <AuthContext.Provider value={{
            signIn,
            singOut,
            signed: !!user,
            user,
            token: "",
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;