import { IReplyInfo } from "./reply-info.model";

export interface IPostInfo {
    // Need to include avatarUrl once added to database
    avatarUrl?: string;
    postId: number;
    firstName: string;
    lastName: string;
    userName: string;
    // user: IUserInfo;
    timestamp: string;
    content: string;
    replies: IReplyInfo[];
    // tags?: ITag[];
    tags?: string[];
}
