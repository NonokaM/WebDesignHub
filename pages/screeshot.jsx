import { getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

async function Screenshot(url) {
  try {
    const screenshotResponse = await axios.get(`/api/screenshot?url=${url}`, { responseType: 'arraybuffer' });
    const screenshotBuffer = new Uint8Array(screenshotResponse.data);

    const storage = getStorage();
    const storageRef = ref(storage, 'screenshots/screenshot.png'); // Change the path and file name as needed

    await uploadBytes(storageRef, screenshotBuffer);

    console.log('Screenshot uploaded');
  } catch (err) {
    console.error(err);
  }
}

Screenshot('https://github.com/NonokaM');
