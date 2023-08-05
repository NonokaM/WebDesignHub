import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import commonStyles from '../styles/common.module.css';
import styles from '../styles/register.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const doRegister = () => {
    if (!email || !password || !passwordConfirm) {
      setErrorMessage('未入力の項目があります');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('パスワードと確認用パスワードが一致しません');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert( '登録完了！' );
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('このメールアドレスは既に登録されています。');
      } else {
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      }
    });
  }

  return (
    <div className={styles.registerContainer}>
      <h1>新規登録</h1>
      {errorMessage && <p className={commonStyles.errorMsg}>{errorMessage}</p>}
        <form className={styles.formContainer}>
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
            placeholder="パスワード（6文字以上）"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="passwordConfirm"
            className={commonStyles.textInput}
            placeholder="パスワード（再入力）"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button
            className={commonStyles.normalBtn}
            onClick={(e)=>{
              e.preventDefault();
              doRegister();
            }}
          >
          登録
          </button>
        </form>
    </div>
  )
}
