import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function CategoryImages({ weddingData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="w-full py-8 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-black">Related Images</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weddingData.images.map((img, index) => (
                    <img
                        key={index}
                        src={`${process.env.REACT_APP_BASE_URL}/gallery${img}`}
                        alt={`image ${index + 1}`}
                        className="w-full h-[270px] object-cover cursor-pointer"
                        onClick={() => {
                            setCurrentImage(index);
                            setIsOpen(true);
                        }}
                    />
                ))}
            </div>

            {isOpen && (
                <Lightbox
                    mainSrc={`${process.env.REACT_APP_BASE_URL}/gallery${weddingData.images[currentImage]}`}
                    nextSrc={`${process.env.REACT_APP_BASE_URL}/gallery${weddingData.images[(currentImage + 1) % weddingData.images.length]}`}
                    prevSrc={`${process.env.REACT_APP_BASE_URL}/gallery${weddingData.images[(currentImage + weddingData.images.length - 1) % weddingData.images.length]}`}
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

export default CategoryImages
 