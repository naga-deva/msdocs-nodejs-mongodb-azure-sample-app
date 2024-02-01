import  helpers  from "../helpers";
import  {httpException}  from "../exceptions";

// import { ErrorMessage } from "../messages";
const logger = helpers.logger;
export const isValidEmail = async (emailId: string): Promise<boolean> => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (regexp.test(emailId)) {
    return true;
  } else {
    return false;
  }
};

// emailId: string,
//   token: any,
//   deepLinkType:string,
//   type: string,
//   subject: string

// send email details
export const sendEmail = async (
  data : any
): Promise<void> => {
  try {

    let html = '';
    console.log('data', data);
    if(data.type === 'otp') {
      html = "<p>"+data.token+"</p>";
    } else if(data.type === 'verification'){
      html = "<p>"+ "Forgot Password Link: " +`<a href=${data.url} style="color: #1076c9;">` + data.url + `</a>` + "</p>";
    } else {
      html = "<p>"+ "Email Verification Link: " + `<a href=${data.url} style="color: #1076c9;">` + data.url + `</a>` + "</p>";
    }

    const sendMailDetails = {
      to: data.emailId,
      subject: data.subject,
      html: html,
    };

    logger.info(" sent mail details ", sendMailDetails);

    helpers.emailer.sendEmail(sendMailDetails);
  } catch (err) {
    // throw new exceptions.http.InternalServertError(
    //   ErrorMessage.INTERNAL_SERVER_ERROR
    // );
  }
};
