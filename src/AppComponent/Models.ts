export interface User {
    userID: number
    fullName: string
    userName: string
    password: string
    eMail: string
    male: boolean
    bio: string
    activate: boolean
    mediaID?: number
    lastSeen:Date
    onLine:boolean
}

export interface SUserStatus {
    userID: number
    userStatusType: string
    description: string
}

export interface SSetting {
    userID: number
    languageID: number
}

export interface SLanguage {
    languageID: number
    languageName: string
}

export interface SGroup {
    groupID: number
    groupName: string
    description: string
    createTime: string
    mediaID?: number
}

export interface SParticipant {
    groupID: number
    userID: number
    permissionID: number
}

export interface SPermission {
    permissionID: number
    writing: boolean
    addingUsers: boolean
    changeGroupName: boolean
    changeGroupPicture: boolean
    //....
}

export interface SMedia {
    mediaID: number
    mediaName: string
    mediaPath: string
    mediaTypeID: number
}

export interface SMediaType {
    mediaTypeID: number
    mediaTypeName: string
    mediaSuffix: string
}

export interface SMessage_Media {
    messageID: number
    mediaID: number
}

export interface Message {
    messageID: number
    content: string
    messageSendDate: Date
    readed: boolean
    replayMessageID?: number
    senderUserID: number
    reciverUserID: number
    reciverGroupID?: number
}

export interface SConversation {
    ConversationID: number
    StartDate: Date
    UserOneID: number
    UserTwoID: number
}