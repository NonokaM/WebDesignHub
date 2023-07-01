// import Head from 'next/head'
import { Inter } from 'next/font/google'
import Post from '../components/Post'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs } from "firebase/firestore"
import { auth, db } from '../lib/firebase'
import styles from '../styles/gallery.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }
    getPosts();
  }, []);

  return (
    <>
      {postList.map((post) => {
        return post.screenshotName ? (
          <Post
            key={post.id}
            url={post.url}
            screenshotName={post.screenshotName}
            comment={post.comment}
            userId={post.userId}
          />
        ) : null;
      })}
    </>
  )
}
