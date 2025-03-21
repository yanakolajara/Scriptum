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
  try {
    const mailOptions = {
      from: config.email.fromEmail,
      to: email,
      subject: 'Verify your account',
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    };
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Sends a verification link to an email address.
 * @param {string} email - The email address to send the link to.
 * @param {string} token - The verification token to send.
 * @returns {Promise<void>}
 * @throws {Error} - If the email fails to send.
 */
export const sendEmailVerification = async (email, token) => {
  try {
    const mailOptions = {
      from: config.email.fromEmail,
      to: email,
      subject: 'Welcome to Scriptum',
      html: `<p>Please click the following link to verify your email:</p>
      <a href="${config.app.clientUrl}/verify-email?token=${token}">Verify Email</a>`,
    };
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
