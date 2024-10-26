const Services = require('../../models/services');

exports.getServicesByName = async (req, res) => {
    try {
        const { serviceName } = req.params;
        const findAll = await Services.find();

        let service;
        for(let i=0; i<findAll.length; i++){
            if(findAll[i].name.toLowerCase().replaceAll(' ','-') === serviceName){
                service = await Services.findById(findAll[i]._id);
            }
        }

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // If the service is found, return it
        res.status(200).json({
            success: true,
            message: 'Service found',
            data: service
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


exports.getServicesByCategory = async (req, res) => {
    try{
        const { serviceCategory } = req.params;

        let service = await Services.find({category: serviceCategory});

        if (service.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // If the service is found, return it
        res.status(200).json({
            success: true,
            message: 'Service found',
            data: service
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}


exports.getServicesBySubCategory = async (req, res) => {
    try{
        const { serviceSubCategory } = req.params;

        let service = await Services.find({subCategory: serviceSubCategory});

        if (service.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // If the service is found, return it
        res.status(200).json({
            success: true,
            message: 'Service found',
            data: service
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}


exports.getServicesByCategoryForTab = async (req, res) => {
    try {
        const { serviceCategory } = req.params;

        const AllService = await Services.find({ category: serviceCategory });

        if (AllService.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Extract unique subcategories
        const uniqueSubCategories = [...new Set(AllService.map(service => service.subCategory))];

        // Group services by subcategory
        const groupedServices = uniqueSubCategories.map(subCategory => {
            const servicesInSubCategory = AllService.filter(service => service.subCategory === subCategory);
            return {
                heading: subCategory,
                links: servicesInSubCategory.map((service, index) => ({
                    id: `${subCategory.replace(' ', '-').toLowerCase()}${index}`,
                    title: service.name
                }))
            };
        });

        // If the service is found, return it
        res.status(200).json({
            success: true,
            message: 'Service found',
            data: groupedServices
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};


exports.getServicesBySubCategoryWithUnique = async (req, res) => {
    try{
        const { serviceCategory } = req.params;

        let AllService = await Services.find({category: serviceCategory});

        if (AllService.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        const uniqueSubCategories = [...new Set(AllService.map(service => service.subCategory))];

        // If the service is found, return it
        res.status(200).json({
            success: true,
            message: 'Service found',
            data: uniqueSubCategories
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}




exports.getServicesForTabs = async (req, res) => {
    try {
        const AllService = await Services.find();

        if (AllService.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Empty Services'
            });
        }

        // Group services by category
        const groupedByCategory = AllService.reduce((acc, service) => {
            const { category, subCategory, name } = service;

            // Initialize category if it doesn't exist
            if (!acc[category]) {
                acc[category] = { heading: category, subCategories: {} };
            }

            // Initialize subcategory if it doesn't exist
            if (!acc[category].subCategories[subCategory]) {
                acc[category].subCategories[subCategory] = [];
            }

            // Add service to the appropriate subcategory
            acc[category].subCategories[subCategory].push({
                id: `${subCategory.replace(' ', '-').toLowerCase()}${acc[category].subCategories[subCategory].length}`,
                title: name
            });

            return acc;
        }, {});

        // Convert the object into an array format suitable for the response
        const responseData = Object.values(groupedByCategory).map(category => ({
            heading: category.heading,
            subCategories: Object.keys(category.subCategories).map(subCategory => ({
                heading: subCategory,
                links: category.subCategories[subCategory]
            }))
        }));

        // If the service is found, return it
        res.status(200).json({
            success: true,
            message: 'Service found',
            data: responseData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
