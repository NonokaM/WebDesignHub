import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';


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
    <div>
      <h1>ログイン</h1>
      <div>
        <form onSubmit={doLogin}>
            <label>
            メールアドレス：
            </label>
            <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <label>
            パスワード：
            </label>
            <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button> ログイン </button>
        </form>
      </div>
    </div>
  )
}
