import { useState } from "react";
import InnerImageZoom from 'react-inner-image-zoom';

const ProductImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]?.url);

    return (
        <div className="flex flex-col items-center md:items-start p-5 rounded-lg overflow-hidden">
            {/* Main Image with Zoom */}
            <div className="w-80 mx-auto mb-2">
                <InnerImageZoom
                    src={mainImage}
                    zoomType="hover"
                    zoomScale={1}
                    className="rounded-lg shadow-md border"
                    alt="Main Product Image"
                />
            </div>

            {/* Centered Thumbnail Navigator */}
            <div className="flex justify-center w-full mt-4">
                <div className="flex gap-2 overflow-x-auto px-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(image.url)}
                            className={`overflow-hidden border rounded-md ${
                                mainImage === image.url ? "border-primary" : "border-gray-300 dark:border-gray-600"
                            } hover:border-primary transition`}
                            style={{ width: '50px', height: '50px' }}
                        >
                            <img
                                src={image.url}
                                alt={`Thumbnail ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImageGallery;