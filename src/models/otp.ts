/* eslint-disable no-unused-vars */
import { Schema, model, Types } from "mongoose";
import * as constants from "./types";
export interface IOtpRoles {
	_id?: Types.ObjectId;
	userId?: Types.ObjectId;
    otp: number;
    otpType: string;
    expiry: Date;
    otpVerified: boolean;
}
const otpSchema = new Schema<IOtpRoles>(
	{
		userId: {
			type: Schema.Types.ObjectId,			
		},
		otp: {
			type: Number,
		},
        otpType: {
			type: String,
		},
        expiry: {
            type: Date
        },       
        otpVerified: {
            type: Boolean
        }
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
		collation: {
			locale: "en",
		},
	},
);
export default model<IOtpRoles>("otp", otpSchema);
