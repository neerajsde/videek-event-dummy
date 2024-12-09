import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import CreatableSelect from "react-select/creatable";
import MdLoader from '../spinner/MdLoader';
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from '../../context/AppContext';

const UploadGallery = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { isActiveConformation, setIsActiveConformation } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);  // Updated to handle multiple images
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [description, setDescription] = useState("");
    const [currAlbum, setCurrAlbum] = useState(null);
    const [formData, setFormData] = useState({
        id:'',
        category:'',
        title:'',
    });

    function inputHandler(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleDescriptionChange = (value) => {
        setDescription(value);
      };

    // Handle multiple files
    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };
    
    const handleCategoryChange = (selectedOption) => {
        setFormData((prevState) => ({
          ...prevState,
          category: selectedOption ? selectedOption.value : "",
        }));
    };

    const getGalleryCategory = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/gallery/category`
          );
    
          if (response.data.success) {
            const formattedSubCategories = response.data.data.map((sub) => ({
              label: sub,
              value: sub,
            }));
            setCategoryOptions(formattedSubCategories);
          } else {
            setCategoryOptions([]);
          }
        } catch (error) {
          setCategoryOptions([]);
        }
    };
    
    useEffect(() => {
        getGalleryCategory();
    }, []);

    const uploadImg = async (index) => {
        try {
            const formXData = new FormData();
            formXData.append("id", formData.id);
            formXData.append("img", images[index]);
    
            const response = await axios.post(`${baseUrl}/gallery/img/upload`, formXData);
    
            if (response.data.success) {
                return 'success';
            } else {
                return 'error';
            }
        } catch (error) {
            return 'something went wrong';
        }
    };
    
    const imagesUploader = async () => {
        if (!formData.id) {
            toast.error('Please refresh the tab');
            return;
        }
    
        try {
            setIsLoading(true);  // Start loader when uploading images
            const formXData = new FormData();
            formXData.append("id", formData.id);
            formXData.append("title", formData.title);
            formXData.append("desc", description);
            const response = await axios.put(`${baseUrl}/gallery/update`, formXData);
            if (response.data.success) {
                await getGalleryCategory();
                setSuccessMessage("updated successfully");
            } else {
                setError(response.data.message);
            }
            // Sequential Upload Approach (Current)
            for (let index = 0; index < images.length; index++) {
                const res = await uploadImg(index);
                if (res !== 'success') {
                    toast.error(`Error uploading image ${index + 1}`);
                    return; // Stop the process on failure
                }
            }
            setSuccessMessage('All images uploaded successfully');
            toast.success('All images uploaded successfully');
        } catch (err) {
            setError('Something went wrong while uploading images');
            toast.error('Something went wrong while uploading images');
        } finally {
            setIsLoading(false);
        }
    };
   

    const getGalleryData = async (albumName) => {
        try {
          const response = await axios.get(
            `${baseUrl}/gelleryById/${albumName}`
          );
    
          if (response.data.success) {
            setCurrAlbum(response.data.data);
            setFormData({
                id: response.data.data._id,
                category: response.data.data.category,
                title: response.data.data.title,
            })
            setDescription(response.data.data.desc);
            toast.success(response.data.message);
          } else {
            setCurrAlbum(null);
          }
        } catch (error) {
            setCurrAlbum(null);
        }
    };
    
    useEffect(() => {
        if(formData.category){
            getGalleryData(formData.category);
        }
    }, [formData.category]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            setIsLoading(true);
            const formXData = new FormData();
            formXData.append("category", formData.category);
            formXData.append("title", formData.title);
            formXData.append("desc", description);
            const response = await axios.post(`${baseUrl}/gellery/create`, formXData);
            if (response.data.success) {
                setFormData({
                    id: response.data.data._id,
                    category: response.data.data.category,
                    title: response.data.data.title,
                });
                setDescription(response.data.data.desc);
                setCurrAlbum(response.data.data);
                await getGalleryCategory();
                setSuccessMessage("Album created successfully");
                toast.success("Album created successfully");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Internal Server Error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    function deleteHandler(){
        if(formData.id){
            const data = {
                _id: formData.id,
                category: formData.category
            }
            setIsActiveConformation({isActive: true, data: data, name:`Galley - ${formData.category}`, tab:'gallery', response:false});
        }
    }

    useEffect(() => {
        if((isActiveConformation.tab === 'gallery') && isActiveConformation.response){
            getGalleryCategory();
            setCurrAlbum(null);
            setFormData({
                id:'',
                category:'',
                title:'',
            });
            setDescription('');
        }
    },[isActiveConformation]);


  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
        <h2 className="text-2xl font-bold text-cyan-600">create, update and delete Album</h2>
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">
                        Image Category
                    </label>
                    <CreatableSelect
                        isClearable
                        required
                        options={categoryOptions}
                        onChange={handleCategoryChange}
                        value={categoryOptions.find(
                            (option) => option.value === formData.category
                        )}
                        placeholder="Create or choose one"
                        className="w-full"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: "#111",
                                borderColor: "#333",
                                height: '45px',
                                color: "white",
                            }),
                            menu: (provided) => ({
                            ...provided,
                            backgroundColor: "#222",
                            }),
                            option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? "#444" : "#222",
                            color: "white",
                            }),
                            singleValue: (provided) => ({
                            ...provided,
                            color: "white",
                            }),
                            placeholder: (provided) => ({
                            ...provided,
                            color: "#555",
                            }),
                    }}
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">About Image</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={inputHandler}
                        required
                        placeholder="write title"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            {/* Description Input */}
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">
                    Description
                </label>
                <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    className="text-white"
                />
            </div>

            {!currAlbum && (<div className="w-full flex justify-start items-end gap-4">
                <div className="w-full flex gap-1">
                    <button
                        onClick={submitHandler}
                        className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                    >
                    {isLoading ? <MdLoader /> : "Create Album"}
                    </button>
                </div>
            </div>)}

            {currAlbum && (<div className='w-full flex flex-col gap-4'>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Upload images</label>
                    <input
                        type="file"
                        name="img" 
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple   // Add multiple attribute to allow multiple selection
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>

                <div className="w-full flex justify-start items-center gap-4">
                    <div className="flex gap-1">
                        <button
                            onClick={imagesUploader}
                            className="h-[45px] w-[250px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                        >
                        {isLoading ? <MdLoader /> : "Upload Images & Save"}
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={deleteHandler}
                            className="h-[45px] w-[150px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-red-600 transition duration-200 ease-in hover:bg-red-700"
                        >
                        Delete
                        </button>
                    </div>
                </div>
            </div>)}

            {/* Error and Success Messages */}
            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
            {successMessage && (
                <p className="text-sm font-semibold text-green-600">
                    {successMessage}
                </p>
            )}
        </div>
    </div>
  )
}

export default UploadGallery;