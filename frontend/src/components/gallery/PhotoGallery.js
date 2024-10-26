import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function PhotoGallery({ weddingData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="w-full px-8 py-8 max-md:p-6 max-sm:px-4 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-black">Photo Gallery</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weddingData.images.map((img, index) => (
                    <img
                        key={index}
                        src={`${process.env.REACT_APP_BASE_URL}/weddings${img}`}
                        alt={`Wedding image ${index + 1}`}
                        className="w-full h-[270px] max-sm:h-[250px] object-cover cursor-pointer"
                        onClick={() => {
                            setCurrentImage(index);
                            setIsOpen(true);
                        }}
                    />
                ))}
            </div>

            {isOpen && (
                <Lightbox
                    mainSrc={`${process.env.REACT_APP_BASE_URL}/weddings${weddingData.images[currentImage]}`}
                    nextSrc={`${process.env.REACT_APP_BASE_URL}/weddings${weddingData.images[(currentImage + 1) % weddingData.images.length]}`}
                    prevSrc={`${process.env.REACT_APP_BASE_URL}/weddings${weddingData.images[(currentImage + weddingData.images.length - 1) % weddingData.images.length]}`}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImage((currentImage + weddingData.images.length - 1) % weddingData.images.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImage((currentImage + 1) % weddingData.images.length)
                    }
                />
            )}
        </div>
    );
}

export default PhotoGallery;
