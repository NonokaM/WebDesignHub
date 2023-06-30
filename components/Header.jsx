import Link from "next/link"
import React from "react"
import { getAuth, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'

import styles from '../styles/header.module.css'


export default function Header({ isAuth, setIsAuth }) {

    const router = useRouter();

    const handleLogout = () => {
        signOut(auth).then(() => {
            if (typeof window !== 'undefined') {
                localStorage.clear();
            }
            setIsAuth(false);
            router.push("/");
        });
    }

    return (
        <nav className={styles.navContainer}>
            <Link href="/">
                <img src="/image.png" alt="" className={styles.logoImg}/>
            </Link>
            <Link href="/search">search</Link>
            {!isAuth ? (
            <Link href="/login">Login</Link>
            ) : (
            <>
                <Link href="/create">create</Link>
                <div className={styles.dropdown}>
                    <Link className={styles.dropbtn} href="/user">user</Link>
                    <div className={styles.dropdownContent}>
                        <Link href="/user">user</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </>
        )}
        </nav>
    )
}
