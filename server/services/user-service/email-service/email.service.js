import nodemailer from 'nodemailer';
import { emailBody } from './email-verification-template.js';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
      from: process.env.EMAIL_FROM_EMAIL,
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
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    const html = emailBody.replace('{{verificationLink}}', verificationLink);
    const mailOptions = {
      from: process.env.EMAIL_FROM_EMAIL,
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
