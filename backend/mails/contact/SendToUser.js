exports.contactUsMailToUser = (name) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting Us</title>
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

                <h2 class="greeting">Hello ${name},</h2>

                <div class="message">
                    <p>Thank you for reaching out to us through our contact form! We have received your message and our team will get back to you as soon as possible.</p>

                    <p>We’re committed to providing you with the best service and we look forward to addressing your inquiry.</p>

                    <p>In the meantime, feel free to visit our website to learn more about the services and solutions we offer. We're here to help with any questions or requests you may have.</p>

                    <p>Thank you for choosing Videek Events, and we’ll be in touch soon!</p>
                </div>

                <div class="cta">
                    <a href=${process.env.WEB_URL} target="_blank">Visit Our Website</a>
                </div>

                <div class="footer">
                    <p>Warm regards,</p>
                    <p><strong>Videek Events Team</strong></p>
                    <p>© 2024 Videek Events. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};