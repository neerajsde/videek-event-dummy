import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function CategoryImages({ weddingData }) {
    const { setImageViewActive } = useContext(AppContext);

    return (
        <div className="w-full py-8 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-black">Related Images</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weddingData.images.map((img, index) => (
                    <img
                        key={index}
                        src={`${process.env.REACT_APP_BASE_URL}/gallery${img}`}
                        alt={`Image ${index + 1}`}
                        className="w-full h-[270px] object-cover cursor-pointer"
                        onClick={() => {
                            setImageViewActive({
                                isActive: true, 
                                index: index,
                                AllImages: weddingData.images, 
                                dirName:'gallery'
                            })
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategoryImages;
