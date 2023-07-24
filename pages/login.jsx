import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import commonStyles from '../styles/common.module.css';
import styles from '../styles/login.module.css';
import Link from "next/link"

import { AuthFlagContext } from "@/components/providers/AuthFlagProvider";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const contextValue = useContext(AuthFlagContext);
  console.log(contextValue);

  const doLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('未入力の項目があります');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setErrorMessage('パスワードもしくはメールアドレスが間違っています。');
            break;
          default:
            setErrorMessage('エラーが発生しました。もう一度お試しください。');
            break;
        }
      });
  }

  return (
    <div className={styles.loginContainer}>
      <h1>ログイン</h1>
      {errorMessage && <p className={commonStyles.errorMsg}>{errorMessage}</p>}
      <form onSubmit={doLogin} className={styles.formContainer}>
          <input
          type="email"
          name="email"
          className={commonStyles.textInput}
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          />
          <input
          type="password"
          name="password"
          className={commonStyles.textInput}
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
          />
          <button className={commonStyles.normalBtn}> ログイン </button>
      </form>
      <Link href="/register" className={styles.registerLink}>
        新規登録はこちら
      </Link>
    </div>
  )
}
