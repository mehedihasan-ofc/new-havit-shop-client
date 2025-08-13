import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase/firebase.config";

// ============================================
import axios from "axios";

// ---------- DATE UTILITY ----------
export const formattedDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')
        }/${dateObj.getFullYear()}`;
};

// ---------- SINGLE IMAGE UPLOAD ----------
/**
 * Upload a single image
 * @param {File} file - The image file
 * @param {string} url - Backend upload endpoint
 * @returns {Promise<{ imageUrl: string }>}
 */
export const uploadSingleImage = async (file, url = "http://localhost:5000/single-image-upload") => {
    if (!file) throw new Error("No file provided");

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // { imageUrl: "http://..." }
};

// ---------- MULTIPLE IMAGE UPLOAD ----------
/**
 * Upload multiple images
 * @param {File[]} files - Array of image files
 * @param {string} url - Backend upload endpoint
 * @returns {Promise<Array<{_id: string, url: string}>>}
 */
export const uploadMultipleImages = async (files, url = "http://localhost:5000/multiple-images-upload") => {
    if (!files || files.length === 0) throw new Error("No files provided");

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));

    const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // [{ _id, url }, { _id, url }, ...]
};

/**
 * Delete an image by ID from the server
 * @param {string} imageId - MongoDB _id of the image
 * @returns {Promise<string>} - Success message from the server
 */
export async function deleteImage(imageUrl) {
    try {
        // Extract the last part after the last slash
        const imageId = imageUrl.split("/").pop();

        const res = await axios.delete(`http://localhost:5000/delete-single-image/${imageId}`);
        return res.data;
    } catch (error) {
        console.error("Failed to delete image:", error);
        throw error;
    }
}
// ============================================

// export const uploadImageToStorage = (image) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const storage = getStorage(app);
//             const fileName = new Date().getTime() + image.name;
//             const storageRef = ref(storage, fileName);
//             const uploadTask = uploadBytesResumable(storageRef, image);

//             uploadTask.on('state_changed', (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 const round = Math.round(progress);
//                 console.log('Upload is ' + round + '% Done!!!');
//             },
//                 (error) => {
//                     console.error('Upload failed:', error);
//                     reject(error);
//                 },
//                 () => {
//                     getDownloadURL(uploadTask.snapshot.ref)
//                         .then((downloadURL) => {
//                             resolve(downloadURL);
//                         })
//                         .catch((error) => {
//                             console.error('Error getting download URL:', error);
//                             reject(error);
//                         });
//                 }
//             );
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             reject(error);
//         }
//     });
// };

export const uploadMultipleImagesToStorage = (images) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);

        const uploadPromises = images.map((image) => {
            return new Promise((resolveImage, rejectImage) => {
                const fileName = new Date().getTime() + image.name;
                const storageRef = ref(storage, `products/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${Math.round(progress)}% done for ${image.name}`);
                    },
                    (error) => {
                        console.error(`Error uploading image: ${image.name}`, error);
                        rejectImage(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                resolveImage(downloadURL);
                            })
                            .catch((error) => {
                                console.error(`Error getting download URL for ${image.name}`, error);
                                rejectImage(error);
                            });
                    }
                );
            });
        });

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                resolve(downloadURLs);
            })
            .catch((error) => {
                console.error("Error uploading one or more images:", error);
                reject(error);
            });
    });
};

export const uploadAdsToStorage = (ads) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);

        const uploadPromises = Object.entries(ads)
            .filter(([_, file]) => file !== null)
            .map(([adType, file]) => {
                return new Promise((resolveAd, rejectAd) => {
                    const fileName = new Date().getTime() + file.name;
                    const storageRef = ref(storage, `ads/${fileName}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload is ${Math.round(progress)}% done for ${adType}`);
                        },
                        (error) => {
                            console.error(`Error uploading ad: ${adType}`, error);
                            rejectAd(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    resolveAd({ adType, downloadURL });
                                })
                                .catch((error) => {
                                    console.error(
                                        `Error getting download URL for ${adType}`,
                                        error
                                    );
                                    rejectAd(error);
                                });
                        }
                    );
                });
            });

        Promise.all(uploadPromises)
            .then((uploadedAds) => {
                const adURLs = uploadedAds.reduce((acc, { adType, downloadURL }) => {
                    acc[adType] = downloadURL;
                    return acc;
                }, {});
                resolve(adURLs);
            })
            .catch((error) => {
                console.error("Error uploading one or more ads:", error);
                reject(error);
            });
    });
};