exports.sendAdminOTPMail = (adminName, otp) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Admin OTP Login</title>
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
                    color: #d9534f;
                    margin-bottom: 15px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .otp {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: #d9534f;
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
                <img src=${process.env.LOGO_URL} alt="Company Logo" class="logo" />

                <h2 class="heading">Admin OTP for Secure Login</h2>

                <div class="message">
                    <p>Hello <strong>${adminName}</strong>,</p>
                    <p>You are attempting to log in to the Admin Dashboard. Please use the following OTP to complete your login securely:</p>
                </div>

                <div class="otp">
                    ${otp}
                </div>

                <div class="message">
                    <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone to ensure account security.</p>
                </div>

                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>Videek Events System</strong></p>
                    <p>© 2024 Videek Events. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
