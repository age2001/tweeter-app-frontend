import { IReplyInfo } from "./reply-info.model";
import { ITag } from "./tag.model";

export interface IPostInfo {
    // Need to include avatarUrl once added to database
    avatarUrl?: string;
    postId: number;
    firstName: string;
    lastName: string;
    userName: string;
    timestamp: string;
    content: string;
    replies?: IReplyInfo[];
    tags?: ITag[];
}
