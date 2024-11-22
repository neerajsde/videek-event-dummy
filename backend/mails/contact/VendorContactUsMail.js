exports.vendorNotificationMail = (vendorName) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Client Inquiry</title>
            <style>
                body {
                    background-color: #f9f9f9;
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
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    max-width: 100px;
                    margin-bottom: 20px;
                }
                .greeting {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0073e6;
                    margin-bottom: 15px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 25px;
                }
                .message p {
                    margin-bottom: 15px;
                }
                .cta {
                    text-align: center;
                    margin: 40px 0;
                }
                .cta a {
                    display: inline-block;
                    background-color: #28a745;
                    color: white;
                    padding: 12px 25px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 16px;
                }
                .footer {
                    font-size: 14px;
                    color: #777;
                    text-align: center;
                    margin-top: 40px;
                }
                .footer p {
                    margin: 5px 0;
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

                <h2 class="greeting">Dear ${vendorName},</h2>

                <div class="message">
                    <p>We are excited to inform you that a new client inquiry has been submitted for your services through Videek Events!</p>

                    <p>For privacy reasons, we are unable to share the client’s details directly. However, our team will follow up with the client and provide you with the necessary updates shortly.</p>

                    <p>Thank you for being a valued partner with Videek Events. We are dedicated to helping you connect with potential clients and grow your business.</p>

                    <p>If you have any questions or require further assistance, please do not hesitate to reach out to our support team.</p>
                </div>

                <div class="cta">
                    <a href=${process.env.WEB_URL} target="_blank">Visit Your Dashboard</a>
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
