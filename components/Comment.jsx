import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../lib/firebase';


export function Comment({ comment }) {
    return (
        <div>
            <h4>{comment.text}</h4>
            {/* <h5>{comment.userId}</h5> */}
        </div>
    );
}


export function CommentForm({ postId }) {
    const [text, setText] = useState('');
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

            setText('');
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={handleTextChange} placeholder="コメントを入力" />
            <button type="submit">コメントを追加</button>
        </form>
    );
}
