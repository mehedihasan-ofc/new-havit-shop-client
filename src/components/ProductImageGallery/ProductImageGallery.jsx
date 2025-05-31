import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const ProductImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]?.url);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <div className="flex flex-col items-center md:items-start p-5 rounded-lg overflow-hidden">
            {/* Main Image */}
            <div className="w-full md:w-80 mx-auto mb-2">
                <img
                    src={mainImage}
                    alt="Main Product Image"
                    onClick={() => setIsLightboxOpen(true)}
                    className="w-full h-auto aspect-square object-contain rounded-lg shadow-md border cursor-pointer"
                />
            </div>

            {/* Thumbnail Navigator */}
            <div className="flex justify-center w-full mt-4">
                <div className="flex gap-2 overflow-x-auto px-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(image.url)}
                            className={`overflow-hidden border rounded-md ${mainImage === image.url ? "border-primary" : "border-gray-300 dark:border-gray-600"
                                } hover:border-primary transition`}
                            style={{ width: "50px", height: "50px" }}
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

            {/* Lightbox */}
            {isLightboxOpen && (
                <Lightbox
                    plugins={[Zoom]}
                    open={isLightboxOpen}
                    close={() => setIsLightboxOpen(false)}
                    slides={images.map((image) => ({ src: image.url }))}
                    index={images.findIndex((img) => img.url === mainImage)}
                />
            )}
        </div>
    );
};

export default ProductImageGallery;