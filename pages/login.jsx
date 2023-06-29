import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../lib/firebase'
import { useRouter } from 'next/router'
import React from 'react'

import styles from '../styles/login.module.css'

export default function Login({ setIsAuth }) {
    const router = useRouter();

    const loginInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider)
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p>ログインして始める</p>
            <button onClick={loginInWithGoogle}>Googleでログイン</button>
        </div>
    )
}
