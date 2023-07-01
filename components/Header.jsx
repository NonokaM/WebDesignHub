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
        <nav className={styles.headerContainer}>
            <Link href="/">
                <img src="/logo.png" alt="" className={styles.logoImg}/>
            </Link>

            <div className={styles.navContainer}>
                <Link href="/search">
                    <img src="/searchIcon.png" alt="" className={styles.searchIcon}/>
                </Link>
                {!isAuth ? (
                <Link href="/login">Login</Link>
                ) : (
                <>
                    <Link href="/create">
                        <img src="/createPostIcon.png" alt="" className={styles.createPostIcon}/>
                    </Link>
                    <div className={styles.dropdown}>
                        <Link className={styles.dropbtn} href="/user">
                            <img src="/userIcon.png" alt="" className={styles.userIcon}/>
                        </Link>
                        <div className={styles.dropdownContent}>
                            <Link href="/user"></Link>
                            <button onClick={handleLogout}>ログアウト</button>
                        </div>
                    </div>
                </>
                )}
            </div>
        </nav>
    )
}
