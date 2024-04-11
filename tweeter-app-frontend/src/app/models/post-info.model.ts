export interface IPostInfo {
    // Need to include avatarUrl once added to database
    avatarUrl?: string;
    firstName: string;
    lastName: string;
    userName: string;
    timestamp: string;
    content: string;
    tags?: string[];
}
