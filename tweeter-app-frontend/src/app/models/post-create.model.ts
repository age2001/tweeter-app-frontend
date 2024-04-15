import { ITag } from "./tag.model";

export interface ICreatePost {
    userName: string;
    content: string;
    tags?: ITag[];
}
