// services/emailService.js
import nodemailer from 'nodemailer';
import { config } from '../config/config.js';
import { emailBody } from './data/email-verification-template.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
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
    return await transporter.sendMail(mailOptions);
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
    const verificationLink = `${config.app.clientUrl}/verify-email?token=${token}`;
    const html = emailBody.replace('{{verificationLink}}', verificationLink);
    const mailOptions = {
      from: config.email.fromEmail,
      to: email,
      subject: 'Welcome to Scriptum',
      html: html,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
