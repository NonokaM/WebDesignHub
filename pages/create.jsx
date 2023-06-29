import styles from '../styles/create.module.css'

// export default function Create() {
//     return(
//         <div className={styles.container}>
//             <input type="text" placeholder="Enter URL"/>
//             <button>button</button>
//         </div>
//     )
// }

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { storage } from '../firebase';
import screenshotmachine from 'screenshotmachine';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


export default function CreatePost({ isAuth }) {
    const [loading, setLoading] = useState(false);
    const [isUploaded, setUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [url, setUrl] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (!isAuth) {
            router.push("/login");
        }
    }, [isAuth, router])


    const generateScreenshot = async () => {
        const customerKey = '46a455';
        const secretPhrase = '';
        const options = {
            url: url,
            dimension: '1366xfull',
            device: 'desktop',
            format: 'png',
            cacheLimit: '0',
            delay: '200',
            zoom: '100'
        }

        const apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

        const response = await fetch(apiUrl);
        const blob = await response.blob();

        saveScreenshotToFirestore(blob);
    }

    const saveScreenshotToFirestore = (blob) => {
        const storageRef = ref(storage, `screenshots/${uuidv4()}.png`);

        const uploadImage = uploadBytesResumable(storageRef, blob);

        uploadImage.on(
        'state_changed',
        (snapshot) => {
            setLoading(true);
        },
        (error) => {
            console.error(error);
            setLoading(false);
        },
        () => {
            setLoading(false);
            setUploaded(true);
            getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImageUrl(downloadURL);
            });
        }
        );
    }

    const handleUrlChange = (event) => {
    setUrl(event.target.value);
    }

    return (
        <div>
            <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL"/>
            <button onClick={generateScreenshot}>
                Generate Screenshot
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
