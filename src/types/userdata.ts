export interface addUserDataInstance {
  name: string;
  accountEmail: string;
  profilePic: string;
  location: string;
  adminLevel: string;
  streaks: string;
  verifyStatus: string;
  points: string;
  tags: string;
  flag: number;
  accountUrl: string;
}
export interface bulkUpdateStatus extends IdList{
  status:string;
  
}
export interface IdList {
  id: Array<number>;
}
export interface updateUserDataInstance {
  name: string;
  email: string;
  phone: string;
  location: string;
  profileStatus: string;
  joinDate: Date;
  verifyStatus: string;
  accessLevel: string;
  flag: number;
  referredBy: string;
}
