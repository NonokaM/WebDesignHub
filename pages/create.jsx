import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { storage } from '../lib/firebase';
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import styles from '../styles/create.module.css'

export default function Create({ isAuth }) {
    const [loading, setLoading] = useState(false);
    const [isUploaded, setUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [url, setUrl] = useState('');

    const router = useRouter();

    async function Screenshot(url) {
        try {
            const screenshotResponse = await axios.get(`/api/screenshot?url=${url}`, { responseType: 'arraybuffer' });
            const screenshotBuffer = new Uint8Array(screenshotResponse.data);

            const storage = getStorage();
            const storageRef = ref(storage, `screenshots/${ url }.png`); // Change the path and file name as needed

            await uploadBytes(storageRef, screenshotBuffer);

            console.log('Screenshot uploaded');
            } catch (err) {
            console.error(err);
        }
    }

    // useEffect(() => {
    //     if (!isAuth) {
    //         router.push("/login");
    //     }
    // }, [isAuth, router])

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const generateScreenshot = () => {
        Screenshot(url);
    }

    return (
        <div className={styles.container}>
            <h2>良いと思ったWebデザインをコメント付きで共有しよう！</h2>
            <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL"/>
            <input type="text" placeholder="コメントを入力" />
            <button onClick={generateScreenshot}>
                Generate Screenshot
            </button>

            {/* {loading ? (
                <h2>Uploading...</h2>
            ) : isUploaded ? (
                <h2>Complete</h2>
            ) : null} */}

            <button>共有する</button>
            {imageUrl && <img src={imageUrl} alt="Screenshot" />}
        </div>
    );
}
