exports.sendUserWelcomeMail = (userName) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Videek Events</title>
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
                .message p {
                    margin-bottom: 10px;
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

                <h2 class="heading">Welcome to Videek Events, ${userName}!</h2>

                <div class="message">
                    <p>Dear ${userName},</p>
                    <p>We are excited to welcome you to the Videek Events community! Your account has been successfully created, and you’re all set to explore and make use of our event services.</p>
                    <p>Feel free to browse our services, book an event, or contact us if you need any assistance.</p>
                </div>

                <div class="message">
                    <p>If you have any questions or require further information, don’t hesitate to reach out to us. We’re here to help!</p>
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
