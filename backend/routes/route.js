const express = require('express');
const router = express.Router();

// auth
const { auth } = require('../middleware/auth');
const { createNewAdmin } = require('../controllers/admin/CreateAdmin');
const { adminLogin, sendOtpAdminOnMail } = require('../controllers/admin/LoginAdmin');
const { getAdminDetails, getWebRealTimeActivity } = require('../controllers/admin/GetAdmin');
const { submitGeneralSettings, getGeneralSettings, changeLogo } = require('../controllers/GeneralSetting');
const { PaymentOrder, verifyPayment, updateVendorForUnlock } = require('../controllers/Payment');
router.post('/payment/order', PaymentOrder);
router.post('/payment/verify', verifyPayment);
router.post('/payment/vendor/update', updateVendorForUnlock);
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
const { getBlogCategoryWithUnique, getBlogById, getLatestBlogsWithCategory, getLatestBlogsForTab } = require('../controllers/blogs/GetBlogs');
// vendor
const { VendorLogin, sendOtpVendorOnMail } = require('../controllers/vendor/LoginVendor');
const { getVendorCategoryWithUnique, getVendorCategories, getCategory, getVendorDetails, getVendorAlbumImages, getVendorByName, getOnVendorAdminVideoLinks, vendorDataInsight, getVendorDataForTheirAdmin } = require('../controllers/vendor/GetVendor');
const { AddNewVendor, UpdateVendorDetails } = require('../controllers/vendor/AddVendor');
const { getVendorFAQs } = require('../controllers/vendor/GetVendorFAQs');
const { addFAQIntoVendor, deleteFAQFromVendor, updateFAQInVendor, uploadVendorAlbumImg, addVideoLinks, deleteVideoLink, changeVendorProfilePic } = require('../controllers/vendor/Update');
const { sendOtpVendor, resetVendorPassword } = require('../controllers/vendor/ForgotPassword');
const { addVendorReviews, uploadVendorReviewImg } = require('../controllers/vendor/writeVendorReviews');
const { getVendorEnquiry, getVendorUnlockedEnquiry, downloadVendorEnquiryData } = require('../controllers/vendor/GetClientEnquiry');
// gallery
const { uploadGalleryImg } = require('../controllers/Gallery/uploadImg');
const { getGalleryCategoryWithUnique, getById, getGalleryData, getGalleryCategory } = require('../controllers/Gallery/GetGallery');
const { createCategoryAlbum } = require('../controllers/Gallery/UploadGallery');
const { updateAlbum } = require('../controllers/Gallery/UpdateGallery');
// Real Weddings
const { createNewRealWedding, uploadRealWeddingImg } = require('../controllers/weddings/AddNewWedding');
const { getWeddingsData, getRealWeddingByCoupleName, getWeddingCategory, fetchCategoryWeddings } = require('../controllers/weddings/GetWeddings');
// Testimonals
const { AddNewTestimonials } = require('../controllers/testimonials/AddTestimonial');
const { getTestimonalForAdmin, getTestimonals } = require('../controllers/testimonials/GetTestimonals');
const { UpdatePublishTestimonals, UnUpdatePublishTestimonals } = require('../controllers/testimonials/UpdateTestimonals');

// venue
const { getVenueCategoryWithUnique, AddNewVenue } = require('../controllers/venue/addVenue');
const { getPopularVenue, getVenueCategory, getVenueByName, getAllVenues, getVenueFAQs } = require('../controllers/venue/getVenue');
const { addVenueReviews, uploadVenueReviewImg } = require('../controllers/venue/writeVenueReview');
const { addFAQIntoVenue, deleteFAQFromVenue, updateFAQInVenue, uploadVenueAlbumImg, deleteVenueAlbumImg } = require('../controllers/venue/UpdateVenue');
// E-Invites-Cards
const { AddNewDummyCard } = require('../controllers/e-invites-cards/AddEInvites');
const { getEInviteCardById, allEInvitesCards } = require('../controllers/e-invites-cards/getEInvites');
// user
const { loginHandler, getUserDetails, loginWithMobile } = require('../controllers/user/LoginHandler');
router.post('/user/login-email', loginHandler);
router.post('/user/login-mobile', loginWithMobile);
router.post('/user/dashboard', auth, getUserDetails);
// admin
router.get('/admin/realtime/data',auth, getWebRealTimeActivity);
router.post('/admin/add', createNewAdmin);
router.post('/admin/login', adminLogin);
router.post('/admin/login-otp', sendOtpAdminOnMail)
router.post('/admin/dashboard', auth, getAdminDetails);
router.post('/admin/setting', auth, submitGeneralSettings);
router.get('/web/data', getGeneralSettings);
router.post('/general-settings/change-logo',auth, changeLogo);
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
router.get('/blogs/tab', getLatestBlogsForTab);
// vendor
router.get('/vendor/category', getVendorCategoryWithUnique);
router.get('/vendor/category-data', getVendorCategories);
router.get('/vendor/category/:categoryName', getCategory);
router.post('/vendor/add', AddNewVendor);
router.put('/vendor/update', UpdateVendorDetails);
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
router.post('/vendor/forgot-password/send-otp', sendOtpVendor);
router.post('/vendor/forgot-password/reset-password', resetVendorPassword);
router.post('/vendor/review/add', addVendorReviews);
router.post('/vendor/review/img/upload', uploadVendorReviewImg);
router.put('/vendor/admin/video/add', auth, addVideoLinks);
router.delete('/vendor/admin/video/delete', auth, deleteVideoLink);
router.post('/vendor/admin/video', auth, getOnVendorAdminVideoLinks);
router.get('/vendor/enquiry/:vendor_id', getVendorEnquiry);
router.get('/vendor/enquiry/unlocked/:vendor_id', auth, getVendorUnlockedEnquiry);
router.get('/vendor/insight/:vendor_id', auth, vendorDataInsight);
router.get('/vendor/details/:vendor_id', auth, getVendorDataForTheirAdmin);
router.put('/vendor/profile-pic/change', changeVendorProfilePic);

// gallery
router.get('/gallery', getGalleryData);
router.post('/gallery/img/upload', uploadGalleryImg);
router.get('/gallery/category', getGalleryCategoryWithUnique);
router.post('/gellery/create', createCategoryAlbum);
router.get('/gelleryById/:albumName', getById);
router.get('/gallery/category/:categoryName', getGalleryCategory);
router.put('/gallery/update', updateAlbum);
// Real Weddings
router.get('/wedding/unique-category', getWeddingCategory);
router.get('/wedding/category/:categoryName', fetchCategoryWeddings);
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
// venue 
router.get('/venue/category', getVenueCategoryWithUnique);
router.get('/venue/all', getAllVenues);
router.post('/venue/add', AddNewVenue);
router.get('/venue/popular', getPopularVenue);
router.get('/venue-category/:categoryName', getVenueCategory);
router.get('/venue/:venue_name/faqs', auth, getVenueFAQs);
router.get('/venue/:Name', getVenueByName);
router.post('/venue/review/add', addVenueReviews);
router.post('/venue/review/img-upload', uploadVenueReviewImg);
router.post('/venue/faq/add',auth, addFAQIntoVenue);
router.put('/venue/faq/update',auth, updateFAQInVenue);
router.delete('/venue/faq/remove',auth, deleteFAQFromVenue);
router.post('/venue/album/img/upload', uploadVenueAlbumImg);
router.delete('/venue/album/img/delete', auth, deleteVenueAlbumImg);
// E-Invites Cards
router.post('/einvites/dummy/add', AddNewDummyCard);
router.get('/einvites/dummy', allEInvitesCards);
router.get('/einvites/card/:cardId', getEInviteCardById);
// downloads
router.get('/download/contact-us', downloadContactUsData);
router.get('/download/vendor-contact-us/:vendor_id', downloadVendorEnquiryData);

router.get('/', (req, res) => {
    res.status(200).json({
        success:true,
        messgae:'For testing purpose'
    })
})

module.exports = router;