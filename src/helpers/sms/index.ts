// // import twilio from "twilio";
// // import env from "../../config/dev.json";
// const accountSid: string = process.env.TWILIO_ACCOUNT_SID;
// const token: string = process.env.TWILIO_AUTH_TOKEN;
// const messagingServiceSid: string = process.env.TWILIO_MSG_SID;
// const client = require('twilio')(accountSid, token)

// // const client = twilio(accountSid, token);

// type SendMessageOptions = {
//   to: string;
//   body: string;
// };
// type MessageID = string;

// export const send = async (options: SendMessageOptions) : Promise<MessageID> => {
//   const message = await client.messages.create({
//     messagingServiceSid,
//     to: options.to,
//     body: options.body,
//   });
//   return message.sid;
// };

// export const sendsms = async (phonenumber) => {
//   const res =  await client.lookups.v2.phoneNumbers(phonenumber) .fetch() .then(phone_number => {
//     console.log('-> then')
//     console.log(phone_number)
//     return phone_number;
//   }).catch(error => console.log('error', error))
//   return res;
// };

// export default { send , sendsms};
