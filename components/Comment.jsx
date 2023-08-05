import { useContext, useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../lib/firebase';
import { AuthFlagContext } from "./providers/AuthFlagProvider"
import styles from '../styles/post.module.css'

export function Comment({ comment }) {
    return (
        <div className={styles.commentContainer}>
            <h3 className={styles.huki}>{comment.text}</h3>
        </div>
    );
}

export function CommentForm({ postId, comments, setComments }) {
    const [text, setText] = useState('');
    const { isAuth, setIsAuth } = useContext(AuthFlagContext);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!currentUser) {
            return;
        }

        try {
            await addDoc(collection(db, "comments"), {
                text: text,
                createdAt: serverTimestamp(),
                userId: currentUser.uid,
                postId: postId
            });

            const newComment = {
                text: text,
                createdAt: new Date(),
                userId: currentUser.uid,
                postId: postId
            };
            setComments([...comments, newComment]);

            setText('');
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }

    return (
        <>
        {!isAuth ? (
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <input type="text" className={styles.hukiInput} value={text} onChange={handleTextChange} placeholder="ログインしてコメントしよう！" />
                <button className={styles.plusbtn} type="submit">＋</button>
            </form>
        ) : (
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <input type="text" className={styles.hukiInput} value={text} onChange={handleTextChange} placeholder="コメントを入力" />
                <button className={styles.plusbtn} type="submit">＋</button>
            </form>
        )}
        </>
    )
}
