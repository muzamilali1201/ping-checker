const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const mailSender = async (recipient) => {
  const info = await transport.sendMail({
    from: process.env.user,
    to: recipient.to,
    subject: recipient.subject,
    html: recipient.text,
  });
};

module.exports = mailSender;
