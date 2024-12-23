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

export const uploadMultipleImagesToStorage = (images) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        
        // Create an array of promises for each image upload
        const uploadPromises = images.map((image) => {
            return new Promise((resolveImage, rejectImage) => {
                const fileName = new Date().getTime() + image.name;  // Unique file name
                const storageRef = ref(storage, `products/${fileName}`);  // Firebase storage reference
                const uploadTask = uploadBytesResumable(storageRef, image); // Upload image

                // Monitor upload progress
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${Math.round(progress)}% done for ${image.name}`);
                    },
                    (error) => {
                        console.error(`Error uploading image: ${image.name}`, error);
                        rejectImage(error);  // Reject the specific image upload if an error occurs
                    },
                    () => {
                        // Once upload is complete, get the download URL
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                resolveImage(downloadURL);  // Resolve the promise with the download URL
                            })
                            .catch((error) => {
                                console.error(`Error getting download URL for ${image.name}`, error);
                                rejectImage(error);  // Reject if there's an issue getting the URL
                            });
                    }
                );
            });
        });

        // Wait for all image uploads to complete
        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                resolve(downloadURLs);  // Return all download URLs
            })
            .catch((error) => {
                console.error("Error uploading one or more images:", error);
                reject(error);  // Reject the entire operation if any upload fails
            });
    });
};

export const uploadAdsToStorage = (ads) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);

        // Create an array of promises for each ad upload
        const uploadPromises = Object.entries(ads)
            .filter(([_, file]) => file !== null) // Filter out null ads
            .map(([adType, file]) => {
                return new Promise((resolveAd, rejectAd) => {
                    const fileName = new Date().getTime() + file.name; // Generate a unique file name
                    const storageRef = ref(storage, `ads/${fileName}`); // Ads folder in Firebase storage
                    const uploadTask = uploadBytesResumable(storageRef, file); // Start upload

                    // Monitor upload progress
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload is ${Math.round(progress)}% done for ${adType}`);
                        },
                        (error) => {
                            console.error(`Error uploading ad: ${adType}`, error);
                            rejectAd(error); // Reject the specific ad upload if an error occurs
                        },
                        () => {
                            // Once upload is complete, get the download URL
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    resolveAd({ adType, downloadURL }); // Resolve with the ad type and its URL
                                })
                                .catch((error) => {
                                    console.error(
                                        `Error getting download URL for ${adType}`,
                                        error
                                    );
                                    rejectAd(error); // Reject if there's an issue getting the URL
                                });
                        }
                    );
                });
            });

        // Wait for all ad uploads to complete
        Promise.all(uploadPromises)
            .then((uploadedAds) => {
                const adURLs = uploadedAds.reduce((acc, { adType, downloadURL }) => {
                    acc[adType] = downloadURL; // Map ad types to their download URLs
                    return acc;
                }, {});
                resolve(adURLs); // Return an object with all uploaded ad URLs
            })
            .catch((error) => {
                console.error("Error uploading one or more ads:", error);
                reject(error); // Reject the entire operation if any upload fails
            });
    });
};