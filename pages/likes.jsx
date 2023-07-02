// import { useEffect, useState } from 'react';
// import { getDoc, query, where, collection, doc } from "firebase/firestore";  // getDocに変更
// import { auth } from '../lib/firebase';
// import { db } from '../lib/firebase';
// import Post from '../components/Post';

// export default function Likes() {
//   const [posts, setPosts] = useState([]);
//   const userId = auth.currentUser?.uid;

//   useEffect(() => {
//     if (userId) {
//       const fetchLikedPosts = async () => {
//         const q = query(collection(db, "likes"), where("userId", "==", userId));
//         const querySnapshot = await getDocs(q);

//         const posts = [];
//         for (const likeDoc of querySnapshot.docs) {
//           const postId = likeDoc.data().postId;
//           const postDoc = await getDoc(doc(db, "posts", postId));  // 修正した箇所
//           if (postDoc.exists()) {
//             posts.push({ ...postDoc.data(), id: postDoc.id });
//           }
//         }
//         setPosts(posts);
//       };
//       fetchLikedPosts();
//     }
//   }, [userId]);

//   console.log(userId);

//   return (
//     <div>
//       {posts.map((post, index) => (
//         <Post key={index} {...post} />
//       ))}
//     </div>
//   );
// }
