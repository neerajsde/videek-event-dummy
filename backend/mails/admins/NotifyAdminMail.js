exports.notifyAdminMail = (userName, userEmail, venueName) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Venue Enquiry</title>
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
                <img src="${process.env.LOGO_URL}" alt="Company Logo" class="logo" />

                <h2 class="heading">New Venue Enquiry Submitted</h2>

                <div class="message">
                    <p>Hello Admin,</p>
                    <p>A new venue enquiry has been submitted by <strong>${userName}</strong>:</p>
                </div>

                <div class="details">
                    <p><strong>Name:</strong> ${userName}</p>
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Venue Name:</strong> ${venueName}</p>
                </div>

                <div class="message">
                    <p>Please review the enquiry and respond accordingly.</p>
                </div>

                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>Vimoo Wed System</strong></p>
                    <p>© 2025 Vimoo Wed. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
