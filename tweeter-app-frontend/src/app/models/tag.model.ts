import { IPost } from "./post.model";
import { IReply } from "./reply.model";

export interface ITag {
    name: string;
    post: IPost;
    reply: IReply;
}
