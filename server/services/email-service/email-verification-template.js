export const emailBody = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title></title>
    <style>
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: #f1f1f1;
        }

        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        img {
            -ms-interpolation-mode: bicubic;
            max-width: 100% !important;
            border: 0 !important;
            height: auto !important;
            line-height: 100%;
            outline: none !important;
            text-decoration: none !important;
        }

        *[x-apple-data-detectors],
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .im {
            color: inherit !important;
        }

        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u~div .email-container {
                min-width: 320px !important;
            }
        }

        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u~div .email-container {
                min-width: 375px !important;
            }
        }

        @media only screen and (min-device-width: 414px) {
            u~div .email-container {
                min-width: 414px !important;
            }
        }
    </style>
    <style>
        .email-container {
            max-width: 600px !important;
            background-color: #ffffff;
            margin: 0 auto !important;
        }

        /* What it does: Forces elements to rely on HTML inheritance or styling for font properties. If set to anything other than inherit, text-size-adjust will not work. */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            font-family:
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Roboto,
                Oxygen-Sans,
                Ubuntu,
                Cantarell,
                "Helvetica Neue",
                sans-serif;
        }

        .paragraph {
            font-size: 16px;
            line-height: 26px;
            color: #000000;
            margin: 20px 0;
        }

        .button {
            background-color: #5F51E8;
            border-radius: 3px;
            color: #fff !important;
            font-size: 16px;
            text-decoration: none !important;
            padding: 12px 20px;
            display: inline-block;
            margin-top: 20px;
        }

        .hr {
            border-color: #cccccc;
            margin: 20px 0;
        }

        .footer {
            color: #8898aa;
            font-size: 12px;
        }
    </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
    <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #f1f1f1;">
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <div style="padding: 20px; background-color: #ffffff;">
                <h1 style="font-size: 24px; font-weight: bold; color: #000000; margin-top: 0;">Welcome to Scriptum</h1>
                <p class="paragraph">Welcome! Thank you for signing up for Scriptum.</p>
                <p class="paragraph">To start using Scriptum, please verify your email address by clicking the link below:</p>
                <p style="text-align: center;">
                    <a href="{{verificationLink}}" class="button">Verify Email</a>
                </p>
                <hr class="hr">
                <p class="paragraph">
                    Best regards,<br>
                    The Scriptum Team
                </p>
                <p class="footer">
                    This is an automated email from Scriptum. Please do not reply.
                </p>
            </div>
        </div>
    </center>
</body>
</html>
`;
