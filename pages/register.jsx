import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from 'react';

import { auth } from '../lib/firebase';

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
    <div>
      <h1>新規登録</h1>
      <div>
        <form>
            <label>
                メールアドレス：
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                パスワード：
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button
                onClick={(e)=>{
                  e.preventDefault();
                  doRegister();
                }}
              >
              登録
            </button>
        </form>
      </div>
    </div>
  )
}
