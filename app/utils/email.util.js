import hbs from 'nodemailer-express-handlebars'
import nodemailer from "nodemailer";
import path from "path";

const sendEmail = async ({ template ="email", subject ="Email", context, email }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST || "smtp.sendgrid.net",
    service: process.env.SERVICE || "smtp",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER || "apikey",
      pass:
        process.env.PASS ||
        "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",
    },
  });

  const mailOptions = {
    from:
      process.env.USER || 'Captain America "<beingcaptainamerica@gmail.com>"', // sender address
    to: email, // list of receivers
    subject: subject,
    template: template, // the name of the template file i.e email.handlebars
    context: context,
  };

  console.log('mail =>' , mailOptions);

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./app/views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./app/views/"),
  };

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));
  const res = await transporter.sendMail(mailOptions);
  return res;
};

export default sendEmail;
