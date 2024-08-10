import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase/firebase.config";

export const formattedDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDateStr = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
    return formattedDateStr;
};

export const uploadImageToStorage = (image) => {
    return new Promise((resolve, reject) => {
        try {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + image.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const round = Math.round(progress);
                console.log('Upload is ' + round + '% Done!!!');
            },
                (error) => {
                    console.error('Upload failed:', error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            // console.log('File available at', downloadURL);
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            console.error('Error getting download URL:', error);
                            reject(error);
                        });
                }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
            reject(error);
        }
    });
};