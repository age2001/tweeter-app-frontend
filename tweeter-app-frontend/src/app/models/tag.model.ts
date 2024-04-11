import { IPost } from "./post-create.model";
import { IReply } from "./reply.model";

export interface ITag {
    name: string;
    post: IPost;
    reply: IReply;
}
