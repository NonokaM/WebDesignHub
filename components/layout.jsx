import Header from 'components/Header'
import Footer from 'components/Footer'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Layout({ children }) {
    // const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === 'true');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsAuth(!!user);
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAuth(localStorage.getItem("isAuth") === 'true');
        }
    }, []);

    return (
        <>
            <Header isAuth={isAuth} setIsAuth={setIsAuth}/>

            <main>{ children }</main>

            <Footer />
        </>
    )
}
