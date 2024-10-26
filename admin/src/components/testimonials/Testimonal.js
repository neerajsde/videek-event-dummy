import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MdLoader from "../spinner/MdLoader";
import Spinner from "../spinner/Spinner";

const Testimonal = () => {
  const [testimonalsData, setTestimonalData] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!testimonalsData) {
      fetchTestimonals();
    }
  }, []);

  const fetchTestimonals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/testimonals/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setTestimonalData(data.data);
    } catch (error) {
      setTestimonalData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const PublishTestimonals = async (testimonalId) => {
    try {
      const response = await fetch(`${baseUrl}/testimonal/admin-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testimonalId: testimonalId
        })
      });

      const data = await response.json();

      if (response.ok) {
        await fetchTestimonals();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const UnPublishTestimonals = async(testimonalId) => {
    try {
      const response = await fetch(`${baseUrl}/testimonal/admin-unPublish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testimonalId: testimonalId
        })
      });

      const data = await response.json();

      if (response.ok) {
        await fetchTestimonals();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full login h-full flex flex-col gap-4 px-8">
      <h2 className="text-lg text-orange-500 uppercase">All Testimonals</h2>
      <div className="w-full">
        {!testimonalsData ? (
          <div className="text-center text-gray-500">Empty Testimonals</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-left  login">SN</th>
                <th className="py-2 px-4 text-left login">User Name</th>
                <th className="py-2 px-4 text-left login">User Email</th>
                <th className="py-2 px-4 text-left login">Action</th>
              </tr>
            </thead>
            <tbody>
              {testimonalsData &&
                testimonalsData.map((item, index) => (
                  <tr key={item._id} className="border-b border-gray-600">
                    <td className="py-2 px-2 login">{index + 1}</td>
                    <td className="py-2 px-4 login">{item.user_name}</td>
                    <td className="py-2 px-4 login">{item.user_email}</td>
                    <td className="py-2 px-4 flex justify-start items-center">
                      {item.publish && (
                        <button
                          onClick={() => UnPublishTestimonals(item._id)}
                          className="text-red-500 border border-red-500 rounded transition duration-200 ease-in hover:bg-red-500 hover:text-white px-2 flex items-center justify-center gap-2 login"
                        >
                          Un Publish {loading && <MdLoader />}
                        </button>
                      )}
                      {!item.publish && (
                        <button
                          onClick={() => PublishTestimonals(item._id)}
                          className="text-green-500 border border-green-500 rounded transition duration-200 ease-in hover:bg-green-500 hover:text-white px-2 flex items-center justify-center gap-2 login"
                        >
                          Publish {loading && <MdLoader />}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Testimonal;
