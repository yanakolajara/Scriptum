// services/emailService.js
import { createTransport } from 'nodemailer';
import { config } from '../config/config.js';

const transporter = createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Mailer is ready to take messages');
  }
});

/**
 * Sends a verification code to an email address.
 * @param {string} code - The verification code to send.
 * @param {string} email - The email address to send the code to.
 */
export const sendCodeToEmail = async (code, email) => {
  const mailOptions = {
    from: config.email.fromEmail,
    to: email,
    subject: 'Verify your account',
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  };

  return transporter.sendMail(mailOptions);
};
