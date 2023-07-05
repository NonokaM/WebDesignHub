import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log( 'ログインOK!' );
        console.log( user );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>ログイン</h1>
      <div style={{ paddingBottom: "1rem" }}>
        <form onSubmit={doLogin}>
            <label>
            メールアドレス：
            </label>
            <input
            type="email"
            name="email"
            style={{ height: 50, fontSize: "1.2rem" }}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label>
            パスワード：
            </label>
            <input
            type="password"
            name="password"
            style={{ height: 50, fontSize: "1.2rem" }}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button
                style={{ width: 220 }}
                color="primary"
                type="submit"
            > ログイン </button>
        </form>
      </div>
    </div>
  )
}
