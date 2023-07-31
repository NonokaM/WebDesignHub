import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/router';
import Post from '../../components/Post';


export default function UserPosts() {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUserId(user.uid);
                fetchUserPosts(user.uid);
            } else {
                setCurrentUserId(null);
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [router]);


    useEffect(() => {
        if (currentUserId) {
            fetchUserPosts(currentUserId);
        }
    }, [currentUserId]);


    const fetchUserPosts = async (userId) => {
        if (!userId) {
            return;
        }
        const q = query(collection(db, "posts"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const posts = [];
        for (const docSnapshot of querySnapshot.docs) {
            const postData = docSnapshot.data();
            postData.id = docSnapshot.id;
            posts.push(postData);
        }
        setUserPosts(posts);
    };


    return(
        <div>
            {userPosts.map((post) => {
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
    )
}
