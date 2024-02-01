const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
import AWS from 'aws-sdk';
import moment from "moment-timezone";
import users from '@src/models/users';
import bcrypt from "bcrypt";
import helpers from "@src/helpers";
import { promisify } from 'util';
import { readFile ,unlink} from 'fs/promises';
import {contentTypeMapToFileExtension as contentTypeMap} from "@src/utilities/commonVariables"
import path from 'path';
const logger = helpers.logger



AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Initialize AWS SES
const ses = new AWS.SES({ region: 'us-east-1' }); // Change the region if necessary
const sns = new AWS.SNS({ region: 'us-east-1' }); // Change the region if necessary
const s3 = new AWS.S3();

export function generateRandomString() {
    let result = '';
    let length = 8;
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



export async function generateAuthToken(payload) {
  const jwtPlayload = {
    emaild: payload.email,
    userId: payload._id,
    phone: payload.phone,
	  role: payload.userRole
};
const token = helpers.jwt.generateJwt(jwtPlayload, process.env.JWT_SECRET);
const refreshToken = helpers.jwt.generateRefreshToken(jwtPlayload, process.env.REFRESH_SECRET);
await users.updateOne( { _id: payload._id },
    { $push: { tokens: { token: token } } },)
  // await user.save()
  return {token, refreshToken};
}


export async function logObject(obj, indent = 0) {
  const spaces = ' '.repeat(indent * 2);
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      console.log(`${spaces}${key}:`);
      logObject(value, indent + 1);
    } else {
      console.log(`${spaces}${key}: ${value}`);
    }
  }
}


export async function deleteFile(fileName: string): Promise<void> {
  try {
    const filePath = path.join(__dirname, '..', `template/${fileName}.pdf`, );
    await unlink(filePath);
    logger.info(`File ${filePath} deleted successfully.`);
    return null;
  } catch (error) {
    logger.error(`Error deleting file Name = ${fileName}:`, error.message);
  }
}