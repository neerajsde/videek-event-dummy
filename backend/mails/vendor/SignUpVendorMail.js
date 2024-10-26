exports.sendVendorRegistrationMail = (vendorName, userId, password) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Successful</title>
            <style>
                body {
                    background-color: #f4f4f4;
                    font-family: 'Arial', sans-serif;
                    font-size: 16px;
                    line-height: 1.8;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    max-width: 100px;
                    margin-bottom: 20px;
                }
                .heading {
                    font-size: 22px;
                    font-weight: bold;
                    color: #28a745;
                    margin-bottom: 15px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .details {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .details p {
                    margin: 5px 0;
                    font-weight: bold;
                }
                .footer {
                    font-size: 14px;
                    color: #777;
                    text-align: center;
                    margin-top: 30px;
                }
                @media (max-width: 600px) {
                    .container {
                        padding: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src=${process.env.LOGO_URL} alt="Company Logo" class="logo" />

                <h2 class="heading">Registration Successful</h2>

                <div class="message">
                    <p>Hello <strong>${vendorName}</strong>,</p>
                    <p>We are pleased to inform you that your registration on the <strong>Videek Events</strong> platform has been successfully completed. Below are your login credentials for accessing the Vendor Dashboard:</p>
                </div>

                <div class="details">
                    <p><strong>User ID:</strong> ${userId}</p>
                    <p><strong>Password:</strong> ${password}</p>
                </div>

                <div class="message">
                    <p>You can now log in to your dashboard using the above credentials. For your security, we recommend changing your password after your first login.</p>
                </div>

                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>Videek Events Team</strong></p>
                    <p>© 2024 Videek Events. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
