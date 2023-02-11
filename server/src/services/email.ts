const nodemailer = require("nodemailer");

require("dotenv").config();

const Transporter = nodemailer.createTransport({
  host: process.env.HOST_SERVICE,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default Transporter;
