import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function PhotoGallery({ weddingData }) {
    const { setImageViewActive } = useContext(AppContext);

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
                            setImageViewActive({
                                isActive: true, 
                                index: index,
                                AllImages: weddingData.images, 
                                dirName:'weddings'
                            })
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default PhotoGallery;
