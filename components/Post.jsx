import Link from "next/link"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import styles from '../styles/post.module.css'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase';
import { Comment, CommentForm } from '../components/Comment';

export default function Post({ url, screenshotName, comment, userId, postId }) {
    const [imageURL, setImageURL] = useState(null);
    const [comments, setComments] = useState([]);
    const storage = getStorage();
    let storageRef = ref(storage, `screenshots/${screenshotName}.png`);

    useEffect(() => {
        getDownloadURL(storageRef)
            .then((url) => {
                setImageURL(url);
            })
            .catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    break;
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
            }
        });

        const fetchComments = async () => {
            const q = query(collection(db, "comments"), where("postId", "==", postId));
            const commentsSnapshot = await getDocs(q);
            setComments(commentsSnapshot.docs.map(doc => doc.data()));
        }

        fetchComments();
    }, [screenshotName, storageRef, postId]);

    return (
        <div className={styles.postContainer}>
            <div className="postHeader">
                {/* <h1>{userId}</h1> */}
                <Link href={url} target="_blank">
                    {imageURL && <img src={imageURL} alt="Screenshot" />}
                    <h3>{url}</h3>
                </Link>
            </div>
            <div className="commentContainer">
                <h2>{comment}</h2>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
                <CommentForm postId={postId} />
            </div>
        </div>
    );
}
