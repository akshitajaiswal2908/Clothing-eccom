const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (userEmail, token) => {
  const url = `${process.env.BASE_URL}/auth/verify/${encodeURIComponent(token)}`;
  
  await transporter.sendMail({
    to: userEmail,
    subject: 'Verify your email',
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
  });
};

const sendOTPEmail = (userEmail, otp) => {
  return transporter.sendMail({
    to: userEmail,
    subject: 'Your Login OTP',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`
  });
};

const sendResetPasswordEmail = async (userEmail, token) => {
  const url = `${process.env.BASE_URL}/auth/reset-password/${encodeURIComponent(token)}`;
  await transporter.sendMail({
    to: userEmail,
    subject: 'Reset your password',
    html: `<p>Click <a href="${url}">here</a> to reset your password. This link will expire in 1 hour.</p>`
  });
};



module.exports = { sendVerificationEmail ,sendResetPasswordEmail , sendOTPEmail};
