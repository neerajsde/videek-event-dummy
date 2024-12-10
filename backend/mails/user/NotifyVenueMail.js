exports.notifyUserMail = (userName, venueName) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Venue Enquiry Confirmation</title>
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
                    color: #0073e6;
                    margin-bottom: 15px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 20px;
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
                <img src="${process.env.LOGO_URL}" alt="Company Logo" class="logo" />

                <h2 class="heading">Venue Enquiry Confirmation</h2>

                <div class="message">
                    <p>Dear <strong>${userName}</strong>,</p>
                    <p>Thank you for submitting your enquiry for the venue with Name: <strong>${venueName}</strong>.</p>
                    <p>Our team has received your request and will get back to you shortly with further details.</p>
                </div>

                <div class="message">
                    <p>If you have any additional questions or would like to provide more information, feel free to reply to this email or contact our support team.</p>
                </div>

                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>Vimoo Wed Team</strong></p>
                    <p>© 2025 Vimoo Wed. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
