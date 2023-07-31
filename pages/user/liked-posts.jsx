import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/router';
import Post from '../../components/Post';

export default function LikedPosts() {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const router = useRouter();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUserId(user.uid);
                fetchLikedPosts(user.uid);
            } else {
                setCurrentUserId(null);
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [router]);


    useEffect(() => {
        if (currentUserId) {
            fetchLikedPosts(currentUserId);
        }
    }, [currentUserId]);


    const fetchLikedPosts = async (userId) => {
        if (!userId) {
            return;
        }
        const q = query(collection(db, "likes"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const posts = [];
        for (const docSnapshot of querySnapshot.docs) {
            const postId = docSnapshot.data().postId;
            const postDoc = await getDoc(doc(db, "posts", postId));
            const postData = postDoc.data();
            postData.id = postDoc.id;
            posts.push(postData);
        }
        setLikedPosts(posts);
    };


    return (
        <div>
            {likedPosts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        postId={post.id}
                        url={post.url}
                        screenshotName={post.screenshotName}
                        comment={post.comment}
                        userId={post.userId}
                        comments={post.comments}
                    />
                )
            })}
        </div>
    );
}
