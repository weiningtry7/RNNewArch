import { User } from "./User"

export interface Post {
    columnId: number
    communityId: number
    createTime: number
    sendTime?: number
    scheduleTime: number // 定时发布时间
    postId: number
    postStat: PostStat
    selfOperation: SelfOperation
    images: [ImageElement]
    vods: []
    content: string
    subject: string
    uid: number //用户id
    type: number 
    user: User
    topicIds: []
    topics: Topic[]
    userStick: boolean
    columnTop: boolean //专栏置顶
    prime: boolean //帖子是否加精
    cover: string | PostCover 
    cellIdentifier?: string //用作FlashList
}

export type PostStat = {
    commentNum: number
    likeNum: number
    compositeState?: number
    relayNum?: number
}

export type ImageElement = {
    width: number
    height: number
    url: string
}

export interface PostCover {
    url: string
}

export type SelfOperation = {
    collected: boolean
    liked: boolean
}

export interface Topic {
    id: number
    topic: string
    createTime: number
    introduce: string
}

export interface SubReply {
    content: string
    structuredContent: string
    uid: number
    postId: number
    parentId: number
    replyUid: number
    user: User
    replyUser: User
}

export interface Comment {
    id: number
    subReplys: SubReply[]
    uid: number
    user: User
    replyUid: number
    replyUser: User
    structuredContent: string
    content: string
    commentStat: CommentStat
    createTime: number
    selfOperation: SelfOperation
}

export interface CommentStat extends PostStat {
    postId: number
}