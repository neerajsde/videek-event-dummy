import React from 'react';
import axios from 'axios';

const DownloadContactUsData = () => {
  const downloadFile = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/download/contact-us`, 
        method: 'GET',
        responseType: 'blob',
      });

      // Create a new Blob object using the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'contact-us.xlsx'); // File name

      // Append to the body, click to download, and remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('There was an error downloading the file');
    }
  };

  return (
    <button onClick={downloadFile} className='w-[220px] text-white border py-2 border-green-600 bg-green-600 rounded transition-all duration-200 ease-in hover:bg-green-700'>
      Download contacts in Excel
    </button>
  );
};

export default DownloadContactUsData;