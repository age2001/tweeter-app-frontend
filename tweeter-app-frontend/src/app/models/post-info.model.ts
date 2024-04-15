import { IReplyInfo } from "./reply-info.model";
import { ITag } from "./tag.model";
import { IUserInfo } from "./user-info.model";

export interface IPostInfo {
    // Need to include avatarUrl once added to database
    avatarUrl?: string;
    postId: number;
    // firstName: string;
    // lastName: string;
    // userName: string;
    user: IUserInfo;
    created: string;
    content: string;
    replies?: IReplyInfo[];
    tags?: ITag[];
}
