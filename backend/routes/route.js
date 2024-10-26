const express = require('express');
const router = express.Router();

// auth
const { auth } = require('../middleware/auth');
const { createNewAdmin } = require('../controllers/admin/CreateAdmin');
const { adminLogin, sendOtpAdminOnMail } = require('../controllers/admin/LoginAdmin');
const { getAdminDetails } = require('../controllers/admin/GetAdmin');
// services
const { getServicesByName, getServicesByCategory, getServicesBySubCategory, getServicesByCategoryForTab, getServicesBySubCategoryWithUnique, getServicesForTabs } = require('../controllers/services/GetServices');
const { AddNewServices } = require('../controllers/services/AddServices');
const { UpdateService } = require('../controllers/services/UpdateServices');
const { RemoveService } = require('../controllers/services/RemoveServices');
// contact 
const { submitContact, downloadContactUsData } = require('../controllers/contacts/contactUs');
const { submitRequestContact } = require('../controllers/contacts/request_contact_us');
const { submitVendorContact } = require('../controllers/contacts/vendor_contact');
// blogs
const { AddNewBlogs } = require('../controllers/blogs/AddBlog');
const { getBlogCategoryWithUnique, getBlogById, getLatestBlogsWithCategory } = require('../controllers/blogs/GetBlogs');
// vendor
const { VendorLogin, sendOtpVendorOnMail } = require('../controllers/vendor/LoginVendor');
const { getVendorCategoryWithUnique, getVendorCategories, getCategory, getVendorDetails, getVendorAlbumImages, getVendorByName } = require('../controllers/vendor/GetVendor');
const { AddNewVendor } = require('../controllers/vendor/AddVendor');
const { getVendorFAQs } = require('../controllers/vendor/GetVendorFAQs');
const { addFAQIntoVendor, deleteFAQFromVendor, updateFAQInVendor, uploadVendorAlbumImg } = require('../controllers/vendor/Update');
// gallery
const { uploadGalleryImg } = require('../controllers/Gallery/uploadImg');
const { getGalleryCategoryWithUnique, getById, getGalleryData, getGalleryCategory } = require('../controllers/Gallery/GetGallery');
const { createCategoryAlbum } = require('../controllers/Gallery/UploadGallery');
// Real Weddings
const { createNewRealWedding, uploadRealWeddingImg } = require('../controllers/weddings/AddNewWedding');
const { getWeddingsData, getRealWeddingByCoupleName } = require('../controllers/weddings/GetWeddings');
// Testimonals
const { AddNewTestimonials } = require('../controllers/testimonials/AddTestimonial');
const { getTestimonalForAdmin, getTestimonals } = require('../controllers/testimonials/GetTestimonals');
const { UpdatePublishTestimonals, UnUpdatePublishTestimonals } = require('../controllers/testimonials/UpdateTestimonals');

// admin
router.post('/admin/add', createNewAdmin);
router.post('/admin/login', adminLogin);
router.post('/admin/login-otp', sendOtpAdminOnMail)
router.post('/admin/dashboard', auth, getAdminDetails);
// services
router.get('/services/:serviceName', getServicesByName);
router.get('/serverces-tab', getServicesForTabs);
router.get('/services-category/:serviceCategory', getServicesByCategory);
router.get('/services-sub-category/:serviceSubCategory', getServicesBySubCategory);
router.get('/services-tab/:serviceCategory', getServicesByCategoryForTab);
router.get('/services-select/:serviceCategory', getServicesBySubCategoryWithUnique);
router.post('/services/add', AddNewServices);
router.put('/services/update', UpdateService);
router.delete('/services/remove', RemoveService);
// contact
router.post('/contact-us', submitContact);
router.post('/contact/request', submitRequestContact);
router.post('/contact/vendor', submitVendorContact);
// blogs
router.post('/blog/post', AddNewBlogs);
router.get('/blog/category', getBlogCategoryWithUnique);
router.get('/blogs', getLatestBlogsWithCategory);
router.get('/blog/:blogId', getBlogById);
// vendor
router.get('/vendor/category', getVendorCategoryWithUnique);
router.get('/vendor/category-data', getVendorCategories);
router.get('/vendor/category/:categoryName', getCategory);
router.post('/vendor/add', AddNewVendor);
router.post('/vendor-login', VendorLogin);
router.post('/vendor-login/otp', sendOtpVendorOnMail);
router.post('/vendor-dashboard', auth, getVendorDetails);
router.get('/vendor/:vendor_id/albums', auth, getVendorAlbumImages);
router.get('/vendor/:vendor_id/faqs', auth, getVendorFAQs);
router.post('/vendor/FAQ/add', auth, addFAQIntoVendor);
router.delete('/vendor/FAQ/delete', auth, deleteFAQFromVendor);
router.put('/vendor/FAQ/update', auth, updateFAQInVendor);
router.post('/vendor/album/img/upload', uploadVendorAlbumImg);
router.get('/vendor/:Name', getVendorByName);
// gallery
router.get('/gallery', getGalleryData);
router.post('/gallery/img/upload', uploadGalleryImg);
router.get('/gallery/category', getGalleryCategoryWithUnique);
router.post('/gellery/create', createCategoryAlbum);
router.get('/gelleryById/:albumName', getById);
router.get('/gallery/category/:categoryName', getGalleryCategory);
// Real Weddings
router.get('/weddings', getWeddingsData);
router.get('/wedding/:coupleName', getRealWeddingByCoupleName);
router.post('/wedding/upload', createNewRealWedding);
router.post('/wedding/img-upload', uploadRealWeddingImg);
// testimonals
router.get('/testimonals', getTestimonals);
router.post('/testimonial/add', AddNewTestimonials);
router.get('/testimonals/admin', getTestimonalForAdmin);
router.put('/testimonal/admin-update', UpdatePublishTestimonals);
router.put('/testimonal/admin-unPublish', UnUpdatePublishTestimonals);
// downloads
router.get('/download/contact-us', downloadContactUsData);

router.get('/', (req, res) => {
    res.status(200).json({
        success:true,
        messgae:'For testing purpose'
    })
})

module.exports = router;