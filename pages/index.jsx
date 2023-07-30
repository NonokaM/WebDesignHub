import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from '../lib/firebase';
import styles from '../styles/gallery.module.css';
import Post from '../components/Post';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayNone, setDisplayNone] = useState(false);

  useEffect(() => {
    const getPostsAndComments = async () => {
      const data = await getDocs(collection(db, "posts"));
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      for (let post of posts) {
        const commentsSnapshot = await getDocs(query(collection(db, "comments"), where("postId", "==", post.id)));
        post.comments = commentsSnapshot.docs.map(doc => doc.data());
      }

      setTimeout(() => {
        setPostList(posts);
        setLoading(false);
      }, 1000);
    };

    getPostsAndComments();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setDisplayNone(true), 1000);
    }
  }, [loading]);

  return (
    <>
      <div className={loading ? styles.loadingScreen : styles.loadingScreen + ' ' + styles.hidden} style={displayNone ? {display: 'none'} : {}}>
        <img src="/logo-character.png" className={styles.floatingImage} alt="loading" />
      </div>
      {!loading && (
        <div className={styles.mainContentContainer}>
          {postList.map((post) => {
            return post.screenshotName ? (
              <Post
                key={post.id}
                postId={post.id}
                url={post.url}
                screenshotName={post.screenshotName}
                comment={post.comment}
                userId={post.userId}
                comments={post.comments}
              />
            ) : null;
          })}
        </div>
      )}
    </>
  );
}
