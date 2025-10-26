import { includes } from "lodash";

/**
 * Converts an image file or blob to a base64 string
 * @param imageFile - The image file or blob to convert
 * @returns Promise that resolves with the base64 string representation of the image
 */
export const imageToBase64 = async (imageFile: File | Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to convert image to base64'));
            }
        };
        reader.onerror = () => {
            reject(new Error('Failed to read image file'));
        };
        reader.readAsDataURL(imageFile);
    });
};

/**
 * Converts a base64 string back to a Blob
 * @param base64String - The base64 string to convert
 * @returns Blob object representing the image
 */
export const base64ToBlob = (base64String: string): Blob => {
    const byteString = atob(base64String.split(',')[1]);
    const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([arrayBuffer], { type: mimeType });
};

export const isValidImageUrl = (url:string): boolean => {
    if (url.includes("icocrmeixbkgovql.public.blob.vercel-storage.com") && url.startsWith("http")){
        return true;
    }
    return false

}