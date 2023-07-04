import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from 'react';

// Firebaseの初期化を行うためfirebaseAppをインポート
import { auth } from '../lib/firebase';

export default function Register() {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(`Email changed: ${email}`);
  }, [email]);  // メールアドレスが変わるたびに実行されます

  useEffect(() => {
    console.log(`Password changed: ${password}`);
  }, [password]);  // パスワードが変わるたびに実行されます

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const doRegister = () => {
    // Firebaseで用意されているユーザー登録の関数
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
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
                  // onChangeでユーザーが入力した値を取得し、その値をemailに入れる
                  onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                パスワード：
                <input
                  type="password"
                  name="password"
                  // onChangeでユーザーが入力した値を取得し、その値をpasswordに入れる
                  onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
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
