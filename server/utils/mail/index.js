const mailer = require("nodemailer");
require("dotenv").config();
const {welcome}  = require('./welcome_template')



const getEmailData = (to, name, token, template) => {
  let data = null;
  switch (template) {
    case "welcome":
      data = {
        from: "Istanbul Market <stnblmarket@gmail.com>",
        to,
        subject: `Welcome to panda ${name}` ,
        html: welcome(),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, token, type) => {
  const smptTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "stnblmarket@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, token, type);

  smptTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent");
    }
    smptTransport.close();
  });
};

module.exports = { sendEmail };
