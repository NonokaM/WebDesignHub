import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import commonStyles from '../styles/common.module.css';
import styles from '../styles/login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const doLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log( user );
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.loginContainer}>
        <h1>ログイン</h1>
        <form onSubmit={doLogin} className={styles.formContainer}>
            <label>
            メールアドレス：
            </label>
            <input
            type="email"
            name="email"
            className={commonStyles.textInput}
            onChange={(e) => setEmail(e.target.value)}
            /><br />
            <label>
            パスワード：
            </label>
            <input
            type="password"
            name="password"
            className={commonStyles.textInput}
            onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button className={commonStyles.normalBtn}> ログイン </button>
        </form>
    </div>
  )
}
