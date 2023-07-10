import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import commonStyles from '../styles/common.module.css'
import styles from '../styles/register.module.css'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(`Email changed: ${email}`);
  }, [email]);

  useEffect(() => {
    console.log(`Password changed: ${password}`);
  }, [password]);

  const doRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得
      const user = userCredential.user;
      alert( '登録完了！' );
      console.log( user );
    })
    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <div className={styles.registerContainer}>
      <h1>新規登録</h1>
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
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
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
