import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from 'react-hot-toast';
import axios from 'axios';

const AllPictures = ({ data }) => {
    const { setImageViewActive } = useContext(AppContext);
    const [images, setImages] = useState([]);
    const [currHover, setCurrHover] = useState([]);

    useEffect(() => {
        if (data?.images) {
            setImages(data.images);
            setCurrHover(Array(data.images.length).fill(false));
        }
    }, [data?.images]);

    const hoverEnterHandler = (index) => {
        setCurrHover((prevState) =>
            prevState.map((hover, i) => (i === index ? true : hover))
        );
    };

    const deleteVenueImg = async (imgPath) => {
        try {
            const token = localStorage.getItem('VideekAdmin');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
    
            const payload = {
                id: data.id, 
                imgPath: imgPath
            };
    
            // Pass the payload in the `data` field
            const response = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/venue/album/img/delete`,
                { ...config, data: payload }
            );
    
            if (response.data.success) {
                setImages(response.data.data.images); // Assuming you want to update the images array
                toast.success('Removed Successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.message || 'Failed to delete image');
        }
    };
    

    if (!images || images.length === 0) {
        return (
            <div className="w-full py-6 flex justify-center items-center">
                <h2 className="text-2xl font-semibold text-gray-500">Empty Images</h2>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {images.map((img, index) => (
                <div key={index} className="w-full h-full relative">
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/venue${img}`}
                        alt="img-not-found"
                        className="w-full h-full object-cover cursor-pointer"
                        onMouseEnter={() => hoverEnterHandler(index)}
                        onClick={() => {
                            setImageViewActive({
                                isActive: true,
                                AllImages: images,
                                dirName: 'venue',
                                index: index,
                            });
                        }}
                    />
                    {currHover[index] && (
                        <div onClick={() => deleteVenueImg(img)} className="absolute top-1 right-1 bg-[#000c]">
                            <RiDeleteBin2Fill className="text-2xl cursor-pointer text-red-500" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AllPictures;
