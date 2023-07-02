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
            console.log("Login successful, redirecting...");
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1>Googleアカウントで新規登録 / ログイン</h1>
            <h2>ログインして投稿・コメントしよう！</h2>
            <button onClick={loginInWithGoogle} className={styles.loginBtn}>Googleでログイン</button>
        </div>
    )
}
