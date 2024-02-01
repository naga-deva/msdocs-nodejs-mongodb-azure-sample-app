// import sgMail from "@sendgrid/mail";
import logger from "@logger";
// import env from "../../config/dev.json";
const nodemailer = require("nodemailer");

// sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export interface MessageFormat {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

const transporter =nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
      chipers: "SSLv3"    },    auth: {
      user: "nagarajan2024@outlook.com",
      pass: "Nagarajan@123"
  }
});

export async function mailer(email, username, otp) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'nagarajan2024@outlook.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hi ${username}, Please click the link below`, // plain text body
    html: `<b>Hi ${username}, your OTP is ${otp}</b>`, // html body
  });

  console.log("Message sent: %s", info);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}



// export const sendEmail = async (msg: MessageFormat): Promise<void> => {
//   try {
//     await sgMail.send({...msg, from : process.env.SEND_GRID_SENDER_IDENTITY});
//     logger.info(`email sent to ${msg.to}`);
//   } catch (err) {
//     logger.error(err);
//   }
// };

// export default { sendEmail };