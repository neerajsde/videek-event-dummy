import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function PhotoGallery({ weddingData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Map images to lightbox-compatible format
    const slides = weddingData.images.map(img => ({
        src: `${process.env.REACT_APP_BASE_URL}/weddings${img}`
    }));

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
                            setCurrentIndex(index);
                            setIsOpen(true);
                        }}
                    />
                ))}
            </div>

            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slides}
                    index={currentIndex}
                    onIndexChange={setCurrentIndex}
                />
            )}
        </div>
    );
}

export default PhotoGallery;
