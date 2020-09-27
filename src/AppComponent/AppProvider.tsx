import React, { Component } from "react";
import { SUser, Message, SGroup, SPermission, AppState, CurrentUser, ConversationUser } from "./Models";
import $ from "jquery";
import * as signalR from "@microsoft/signalr";
export const MyContext = React.createContext({} as IContextInit);

export interface IContextInit {
    state: AppState;
    SetContact: (name: ConversationUser) => void;
    AddMessage: (mes: Message) => void;
    GetUsersByUserNameOrEMail: (usrnm: string | undefined) => ConversationUser[];
    AddUserToConversations: (usrnm: string) => ConversationUser;
    CreateGroup: (grp: SGroup) => number;
    AddMemberToGroup: (grpid: number, usrnm: string, permession: SPermission) => void;
}

export class Convertion {
    public static SToUser = (usr: SUser): ConversationUser => {
        return { Bio: usr.bio, ConversationID: usr.userID, ConversationName: usr.userName, EMail: usr.eMail, FullName: usr.fullName, LastSeen: usr.lastSeen } as ConversationUser;
    }

    public static UserToS = (usr: ConversationUser): SUser => {
        return { activate: true, bio: usr.Bio, lastSeen: usr.LastSeen, male: true, eMail: usr.EMail, fullName: usr.FullName, onLine: true, userID: usr.ConversationID, userName: usr.ConversationName } as SUser;
    }
}

export default class AppProvider extends Component<{}, AppState> {
    connection: signalR.HubConnection;
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    constructor(props: any) {
        super(props);
        var usr = {} as SUser;
        var usrcon = [] as ConversationUser[];
        var mess = [] as Message[];
        let userID = parseInt($("#ID").val()!.toString());
        // this.connection = new signalR.HubConnectionBuilder()
        //     .configureLogging(signalR.LogLevel.Debug)
        //     .withUrl("https://localhost:44399/chathub")
        //     .build();
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/chathub")
            .build();

        this.connection
            .start()
            .then(() => {
                console.log("connection is OK with socket");
                this.connection.invoke("LogIn", userID).catch((err) => console.log(err));
                this.connection.on("ReceiveMessage", (mes: Message) => {
                    //user message
                    if (mes.reciverUserID !== -1) {
                        let tmp = this.state.UserConversations.find((val) => { return val.ConversationID === mes.reciverUserID || val.ConversationID === mes.senderUserID; });
                        //user in contacts
                        if (tmp !== undefined) {
                            tmp.Messages = tmp.Messages?.concat(mes);
                            this.setState({ UserConversations: this.state.UserConversations })
                        }
                        //get new user and add message to it
                        else {
                            $.ajax({
                                type: "GET",
                                async: true,
                                url: "https://localhost:44309/TetraAPI/GetUserDataByID",
                                data: { ID: mes.senderUserID },
                                success: (res: SUser) => {
                                    let tmp = { ConversationID: res.userID, Bio: res.bio, ConversationName: res.userName, LastSeen: res.lastSeen, EMail: res.eMail, FullName: res.fullName } as ConversationUser;
                                    tmp.Messages = [mes] as Message[];
                                    this.setState({
                                        UserConversations: this.state.UserConversations.concat(tmp)
                                    });
                                },
                                error: (xhr) => {
                                    console.error(xhr);
                                },
                            });
                        }
                    }
                    //group message
                    else {
                        let tmp = this.state.GroupConversations.find((val) => { return val.ConversationID === mes.reciverGroupID; });
                        if (tmp !== undefined) {
                            tmp.Messages = tmp.Messages?.concat(mes);
                            this.setState({ GroupConversations: this.state.GroupConversations })
                        }
                        else {
                            //get the new Group and add the message to it
                        }
                    }
                });
            })
            .catch((err: any) => console.error(err.toString()));

        $.ajax({
            type: "GET",
            async: false,
            url: "https://localhost:44309/TetraAPI/GetUserDataByID",
            data: { ID: userID },
            success: (result: any) => {
                if (result === "NotFound") {
                    usr = {
                        userID: 2,
                        eMail: "a@a.com",
                        fullName: "a:FullName",
                        userName: "a:UserName",
                        bio: "Here`s My Tetra Acct.",
                        activate: true,
                        male: true,
                        password: "a",
                        mediaID: undefined,
                    } as SUser;
                } else {
                    usr = result as SUser;
                }
            },
            error: (xhr) => {
                console.error(xhr);
                usr = {
                    userID: 2,
                    eMail: "a@a.com",
                    fullName: "a:FullName",
                    userName: "a:UserName",
                    bio: "Here`s My Tetra Acct.",
                    activate: true,
                    male: true,
                    password: "a",
                    mediaID: undefined,
                } as SUser;
            },
        });

        $.ajax({
            type: "GET",
            async: false,
            url: "https://localhost:44309/TetraAPI/GetUserConversationByID",
            data: { ID: usr.userID },
            success: (result: SUser[]) => {
                result.forEach((item) => {
                    usrcon = usrcon.concat({ ConversationID: item.userID, Bio: item.bio, ConversationName: item.userName, LastSeen: item.lastSeen } as ConversationUser)
                })
            },
            error: (xhr) => {
                console.error(xhr);
            },
        });

        $.ajax({
            type: "GET",
            async: false,
            url: "https://localhost:44309/TetraAPI/GetMessagesByID",
            data: { ID: usr.userID },
            success: (result: Message[]) => {
                mess = result;
                usrcon.forEach((val) => {
                    val.Messages = mess.filter((mess) => {
                        if (mess.senderUserID === val.ConversationID || mess.reciverUserID === val.ConversationID)
                            return mess;
                        else return undefined;
                    })
                })
            },
            error: (xhr) => {
                console.error(xhr);
            },
        });

        let tmp = {} as CurrentUser;
        tmp.UserID = usr.userID;
        tmp.UserName = usr.userName;
        tmp.FullName = usr.fullName;
        tmp.EMail = usr.eMail;
        tmp.Bio = usr.bio;
        // tmp.ImagePath = usr
        this.state = {
            CurrentUser: tmp,
            UserConversations: usrcon,
            GroupConversations: [],
            CurrentConversation: {} as ConversationUser
        };
    }
    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    SetContact: (usr: ConversationUser) =>
                        this.setState({ CurrentConversation: usr }),
                    AddMessage: (mes: Message) => {
                        this.connection
                            .invoke("SendMessage", mes)
                            .catch((err) => console.error(err.toString()));
                    },
                    GetUsersByUserNameOrEMail: (usrnm: string | undefined) => {
                        var usrs = [] as SUser[];
                        let res = [] as ConversationUser[];
                        $.ajax({
                            type: "GET",
                            async: false,
                            url:
                                "https://localhost:44309/TetraAPI/GetUsersByUserNameOrEMail",
                            data: { usrnm: usrnm },
                            success: (result: SUser[]) => {
                                usrs = result;
                            },
                            error: (xhr) => {
                                console.log(xhr);
                            },
                        });
                        usrs.forEach((item) => { res = res.concat(Convertion.SToUser(item)) })
                        return res;
                    },
                    AddUserToConversations: (usrnm: string) => {
                        var usr = {} as ConversationUser;
                        $.ajax({
                            type: "GET",
                            async: false,
                            url:
                                "https://localhost:44309/TetraAPI/AddUserToConversationsByUserName",
                            data: {
                                usrnm: usrnm,
                                curusrnm: this.state.CurrentUser.UserName,
                            },
                            success: (result: SUser) => {
                                usr = { ConversationID: result.userID, Bio: result.bio, ConversationName: result.userName, LastSeen: result.lastSeen, EMail: result.eMail, FullName: result.fullName } as ConversationUser;
                                this.setState({
                                    UserConversations: this.state.UserConversations.concat(usr)
                                });
                            },
                            error: (xhr) => {
                                console.log(xhr);
                            },
                        });
                        return usr;
                    },
                    CreateGroup: (grp: SGroup) => {
                        this.connection.invoke("CreateGroup", grp).then((val: number) => grp.groupID = val);
                        console.log(grp.groupID);
                        return grp.groupID;
                    },
                    AddMemberToGroup: (grpid: number, usrnm: string, permession: SPermission) => {
                        // this.connection.invoke("AddMemberToGroup", grpid, usrnm, permession).catch((err) => { console.log(err) });
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}