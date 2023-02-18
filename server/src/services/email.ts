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

interface mailOptions {
  from: string;
  to: string;
  cc: Array<string>;
  bcc: Array<string>;
  subject: string;
  html: string;
}

const sendEmail = (mailOptions: mailOptions) => {
  //sending email to the given email address
  Transporter.sendMail(mailOptions, (err: Error, info: String) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sended with=", info);
    }
  });
};

export default sendEmail;
