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
  //TODO: Handle errors (email not found, email not sent, service down)
  // if FAIL: retry sending email
  // if FAIL 3 times: respond with InternalServerError, and message to try later
  return transporter.sendMail(mailOptions);
};
