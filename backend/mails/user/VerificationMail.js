exports.sendVerificationMail = (userName, otpCode) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
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
                    color: #007bff;
                    margin-bottom: 15px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .message p {
                    margin-bottom: 10px;
                }
                .otp-code {
                    font-size: 20px;
                    font-weight: bold;
                    color: #28a745;
                    text-align: center;
                    margin: 20px 0;
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

                <h2 class="heading">Verify Your Email Address</h2>

                <div class="message">
                    <p>Dear ${userName},</p>
                    <p>We are excited to have you on board! To complete your registration, please verify your email address using the One-Time Password (OTP) provided below:</p>
                </div>

                <div class="otp-code">${otpCode}</div>

                <div class="message">
                    <p>If you did not initiate this request, please ignore this email or contact our support team immediately.</p>
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
