import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import styles from '../styles/post.module.css'

export default function Post({ url, screenshotName, comment, userId }) {
    const [imageURL, setImageURL] = useState(null);
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
    }, [screenshotName, storageRef]);

    return (
        <div className={styles.postContainer}>
            <div className="postHeader">
                <h1>{url}</h1>
                <h1>{comment}</h1>
                {/* <h1>{userId}</h1> */}
                {imageURL && <img src={imageURL} alt="Screenshot" />}
            </div>
        </div>
    );
}
