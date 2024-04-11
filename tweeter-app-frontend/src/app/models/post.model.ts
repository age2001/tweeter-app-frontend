import { IUser } from "./user.model";

export interface IPost {
    id: number;
    content: string;
    timestamp: string;
    user: IUser;
}
