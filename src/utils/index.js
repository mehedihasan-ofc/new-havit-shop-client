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

/**
 * Delete multiple images by IDs from the server
 * @param {string[]} imageUrls - Array of image URLs
 * @returns {Promise<string[]>} - Array of success messages from the server
 */
export async function deleteMultipleImages(imageUrls) {
    try {
        // Extract only the image IDs from URLs
        const imageIds = imageUrls.map(url => url.split("/").pop());

        const res = await axios.delete(`http://localhost:5000/delete-multiple-images`, {
            data: { ids: imageIds }
        });
        return res.data;
    } catch (error) {
        console.error("Failed to delete multiple images:", error);
        throw error;
    }
}