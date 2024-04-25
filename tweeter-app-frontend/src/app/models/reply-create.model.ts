import { ITag } from "./tag.model";

export interface ICreateReply {
    userName: string;
    content: string;
    tags?: string[];
    postId: number;
}
