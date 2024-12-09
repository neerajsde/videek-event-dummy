const ContactUs = require('../../models/contact');

function getISTDateAndTime(createdAt) {
    // Parse the ISO date
    const date = new Date(createdAt);

    // Convert to IST using locale and timezone
    const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const formatter = new Intl.DateTimeFormat("en-IN", options);
    
    // Split the formatted date and time
    const formattedDateTime = formatter.format(date);
    const [datePart, timePart] = formattedDateTime.split(", ");

    return {
        date: datePart.replaceAll("/", "-"), // Convert MM/DD/YYYY to DD/MM/YYYY
        time: timePart
    };
}


exports.getAllContactsDataForAdmin = async (req, res) => {
    try{
        const AllContacts = await ContactUs.find().sort({ createdAt: -1 });
        if(AllContacts.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Empty Contact'
            })
        }
        const uniqueCategories = [...new Set(AllContacts.map(item => item.name))];
        const updatedArr = [];
        for(let i=0 ;i<AllContacts.length; i++){
            const { date, time } = getISTDateAndTime(AllContacts[i].createdAt);
            const newObj = {
                name: AllContacts[i].name,
                phone: AllContacts[i].phone,
                email: AllContacts[i].email,
                date: date,
                time: time,
                subject: AllContacts[i].subject,
                message: AllContacts[i].message
            }
            updatedArr.push(newObj);
        }
        res.status(200).json({
            success: true,
            data: updatedArr,
            services: uniqueCategories,
            message: 'Found All Contact'
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}