import { useState } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import styles from '../styles/create.module.css'
import { db, storage } from '../lib/firebase';

export default function Create({ isAuth }) {
    const [loading, setLoading] = useState(false);
    const [isUploaded, setUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [url, setUrl] = useState('');
    const [comment, setComment] = useState('');

    const router = useRouter();

    async function Screenshot(url) {
        try {
            const screenshotResponse = await axios.get(`/api/screenshot?url=${url}`, { responseType: 'arraybuffer' });
            const screenshotBuffer = new Uint8Array(screenshotResponse.data);

            const name = uuidv4();
            const screenshotPath = `screenshots/${name}.png`;
            const storageRef = ref(storage, screenshotPath);

            await uploadBytes(storageRef, screenshotBuffer);

            const screenshotUrl = await getDownloadURL(storageRef);

            console.log('Screenshot uploaded');
            return { screenshotName: name, screenshotUrl: screenshotUrl }; // Return the values here
        } catch (err) {
            console.error(err);
        }
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleSubmit = async () => {
        // if (!isAuth) {
        //     router.push("/login");
        //     return;
        // }

        setLoading(true);

        const screenshot = await Screenshot(url); // Get the returned values here

        try {
            const docRef = await addDoc(collection(db, "posts"), {
                url: url,
                screenshotName: screenshot.screenshotName, // Use the value here
                comment: comment,
                createdAt: Timestamp.now(),
            });

            setImageUrl(screenshot.screenshotUrl); // Set the imageUrl state here

            console.log("Document written with ID: ", docRef.id);
            setUploaded(true);
        } catch (err) {
            console.error("Error adding document: ", err);
        }

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <h2>良いと思ったWebデザインをコメント付きで共有しよう！</h2>
            <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL"/>
            <input type="text" value={comment} onChange={handleCommentChange} placeholder="コメントを入力" />
            <button onClick={handleSubmit}>
                共有する
            </button>

            {loading ? (
                <h2>Uploading...</h2>
            ) : isUploaded ? (
                <h2>Complete</h2>
            ) : null}

            {imageUrl && <img src={imageUrl} alt="Screenshot" />}
        </div>
    );
}
