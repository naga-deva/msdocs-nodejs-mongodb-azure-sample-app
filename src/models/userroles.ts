/* eslint-disable no-unused-vars */
import { Schema, model, Types } from "mongoose";
import * as constants from "./types";
export interface IUserRoles {
	_id?: Types.ObjectId;
	name?: string;
	status?: constants.UserRolesStatusEnum;
}
const userRolesSchema = new Schema<IUserRoles>(
	{
		name: {
			type: String,			
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
		},
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
export default model<IUserRoles>("user_roles", userRolesSchema);
