import { IUser } from './user.model';

export interface IReply {
    id: number;
    content: string;
    user: IUser;
}
