/* eslint-disable no-unused-vars */
import { Schema, model, Types } from "mongoose";
import * as constants from "./types";
import userroles from "./userroles";
import helpers from "../helpers";
export interface IUsers {
	userName?: string;
	fullName?: string;
	phoneNumber?: string;
	profileImage?: string;
	email?: string;
	password?: string;
	roleId?: string;
	status?: string;
	otp?: {
		code: string;
		expiry: number;
	  };
    hasAgreedTerms?: boolean;
	CountryCode?: string;
	accesstokens?: string;
	dateOfBirth?: Date;
	isVerified?: boolean
}
const usersSchema = new Schema<IUsers>(
	{
		userName: {
			type: String,
			minlength: 3,
			maxlength: 20,
			required: true,
			unique: true
		},
		fullName: {
			type: String,
			minlength: 3,
			maxlength: 20,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true
		},
		profileImage: {
			type: String
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
		},
		roleId: {
			type: String,
			// enum: ['agent', 'customer']
		},
		status: {
			type: String,
			enum: ['active', 'deleted', 'inactive'],
			default: 'active',
		},
		hasAgreedTerms: {
			type: Boolean,
		},
		CountryCode: {
			type: String,
		},
		dateOfBirth: {
			type: Date,
			required: true
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		otp: {
			code: String,
			expiry: Number,
			token: String,
		  },
		accesstokens: [{
			token: {
				type: String,
			}
		}],
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
usersSchema.methods.generateAuthToken = async function () {
	const user = this;
	const jwtPlayload = {
	  "userId": user._id.toString(),
	  "email": user.email,
	  "phoneNumber": user.phoneNumber,
	  "roleId": user.roleId
  };
  const jwtToken = helpers.jwt.generateJwt(jwtPlayload, process.env.JWT_SECRET);
  const refreshToken = helpers.jwt.generateRefreshToken(jwtPlayload, process.env.REFRESH_SECRET);
  user.tokens = user.tokens.concat({jwtToken})

return {jwtToken, refreshToken};
  }
export default model<IUsers>("users", usersSchema);
