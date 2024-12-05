const Vendor = require('../../models/vendor_category');
const VendorEnquiry = require('../../models/basic_contact_vendor');
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function getFormattedDateTime(dateTimeString) {
    // Parse the string into a Date object
    const date = new Date(dateTimeString);
  
    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    // Extract the time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return { date: formattedDate, time: formattedTime };
}


exports.getVendorEnquiry = async (req, res) => {
    try {
        const { vendor_id } = req.params;
        const findVendor = await Vendor.findById(vendor_id);

        if (!findVendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor Not Found',
            });
        }

        // Fetch all user enquiries matching the vendor's category
        const allUserEnquiries = await VendorEnquiry.find({ category: findVendor.category }).sort({ createdAt: -1 });

        if (allUserEnquiries.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No enquiries found',
            });
        }

        const unlockedEnquiries = findVendor.clientInformation.map(info => info._id.toString());
        const filteredEnquiries = allUserEnquiries.filter(enquiry => 
            !unlockedEnquiries.includes(enquiry._id.toString())
        );

        // Modify the filtered enquiries data
        const modifiedEnquiries = filteredEnquiries.map(enquiry => ({
            id: enquiry._id,
            user_name: enquiry.name,
            phone: enquiry.phone
                ? `${enquiry.phone.slice(0, 3)}xxxxxxx${enquiry.phone.slice(-3)}`
                : 'NONE',
            email: enquiry.email
                ? `${enquiry.email.split('@')[0].slice(0, 4)}xxxx@${enquiry.email.split('@')[1]}`
                : 'NONE',
        }));

        res.status(200).json({
            success: true,
            data: modifiedEnquiries,
            message: 'Fetched all enquiries',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


exports.getVendorUnlockedEnquiry = async(req, res) => {
    try{
        const {vendor_id} = req.params;
        const findVendor = await Vendor.findById(vendor_id).populate('clientInformation');
        if(!findVendor){
            return res.status(404).json({
                success: false,
                message: 'Vendor Not Found'
            })
        }
        res.status(200).json({
            success: true,
            data: findVendor.clientInformation,
            message:'Get All Enquires'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.downloadVendorEnquiryData = async (req, res) => {
    try {
        const {vendor_id} = req.params;
        const isFindVendor = await Vendor.findById(vendor_id).populate('clientInformation');
        
        if(!isFindVendor){
            return res.status(404).json({
                success: false,
                message: 'Vendor Not Found',
            });
        }
        if(isFindVendor.clientInformation.length < 0){
            return res.status(404).json({
                success: false,
                message: 'Empty Enquiry Not Found',
            });
        }

        const data = [];
        for(let i=0; i<isFindVendor.clientInformation.length; i++){
            const currData = isFindVendor.clientInformation[i];
            const dateAndTime = getFormattedDateTime(currData.createdAt);
            data.push({
                Name:currData.name,
                Email:currData.email,
                Phone:currData.phone,
                Category: currData.category,
                Date: dateAndTime.date,
                Time: dateAndTime.time
            });
        }

        const xls = json2xls(data);
        const uploadDir = path.join(__dirname,'../..', 'uploads');

        // Create upload directory if it does not exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, 'vendor-contact-us.xlsx');

        // Write the Excel file
        fs.writeFileSync(filePath, xls, 'binary');

        // Send the Excel file as a response
        res.download(filePath, 'contact-us.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Error sending file.',
                });
            }

            // Optionally delete the file after sending
            fs.unlink(filePath, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting file:', unlinkError.message);
                }
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};