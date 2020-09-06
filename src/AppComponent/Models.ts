export interface SUser {
    userID: number;
    fullName: string;
    userName: string;
    password?: string;
    eMail: string;
    male: boolean;
    bio: string;
    activate: boolean;
    mediaID?: number;
    lastSeen: number;
    onLine: boolean;
}

export interface SUserStatus {
    userID: number;
    userStatusType: string;
    description: string;
}

export interface SSetting {
    userID: number;
    languageID: number;
}

export interface SLanguage {
    languageID: number;
    languageName: string;
}

export interface SGroup {
    groupID: number;
    groupName: string;
    description: string;
    createTime: number;
    mediaID?: number;
}

export interface SParticipant {
    groupID: number;
    userID: number;
    permissionID: number;
}

export interface SPermission {
    permissionID: number;
    writing: boolean;
    addingUsers: boolean;
    changeGroupName: boolean;
    changeGroupPicture: boolean;
    //....
}

export interface SMedia {
    mediaID: number;
    mediaName: string;
    mediaPath: string;
    mediaTypeID: number;
}

export interface SMediaType {
    mediaTypeID: number;
    mediaTypeName: string;
    mediaSuffix: string;
}

export interface SMessage_Media {
    messageID: number;
    mediaID: number;
}

export interface SConversation {
    conversationID: number;
    startDate: Date;
    userOneID: number;
    userTwoID: number;
}

export interface Message {
    messageID: number;
    content: string;
    messageSendDate: Date;
    readed: boolean;
    replayMessageID?: number;
    senderUserID: number;
    reciverUserID: number;
    reciverGroupID?: number;
}



//********************************************************************



export interface CurrentUser {
    UserID: number;
    FullName: string;
    UserName: string;
    EMail: string;
    Bio?: string;
    ImagePath?: string;
}
export interface Conversation {
    ConversationID: number;
    ConversationName: string;
    Bio: string;
    ImagePath?: string;
    Messages?: Message[];
    LastMessage?: Message;
}
export interface ConversationUser extends Conversation {
    LastSeen: number;
    FullName:string;
    EMail:string;
}
export interface ConversationGroup extends Conversation {
    Participant: ConversationUser[];
}
export interface AppState {
    CurrentUser:CurrentUser;
    UserConversations:ConversationUser[];
    GroupConversations:ConversationGroup[];
    CurrentConversation?:ConversationGroup|ConversationUser;
}
