import { ITag } from "./tag.model";

export interface IReplyInfo {
    avatarUrl?: string;
    postId: number;
    // firstName: string;
    // lastName: string;
    // username: string;
    timestamp: string;
    content: string;
    tags?: ITag[];
}
