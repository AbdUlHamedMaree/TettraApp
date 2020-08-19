import React, { Component } from "react";
import { User, Message, SGroup } from "./Models";
import $ from "jquery";
import * as signalR from "@microsoft/signalr";

interface IContextState {
    CurrentUser: User;
    ConversationUser: User;
    Messages: Message[];
    ConversationMessages: Message[];
    UserContacts: User[];
}

export interface IContextInit {
    state: IContextState;
    SetCurrentUser: (usr: User) => void;
    SetContact: (name: User) => void;
    AddMessage: (mes: Message) => void;
    SetMessages: (mess: Message[]) => void;
    GetUsersByUserNameOrEMail: (usrnm: string | undefined) => User[];
    AddUserToConversations: (usrnm: string) => User;
    CreateGroup: (grp: SGroup) => void;
    AddMemberToGroup: (grp: SGroup, usr: User) => void;
}

export const MyContext = React.createContext({} as IContextInit);
export default class AppProvider extends Component<{}, IContextState> {
    connection: signalR.HubConnection;
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    constructor(props: any) {
        super(props);
        var usr = {} as User;
        var usrcon = [] as User[];
        var mess = [] as Message[];
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        this.connection
            .start()
            .then(() => {
                console.log("connection is done with socket");
                this.connection.on("ReceiveMessage", (mes: Message) => {
                    this.setState({
                        Messages: this.state.Messages.concat(mes),
                    });
                    if (mes.reciverUserID === this.state.CurrentUser.userID || mes.reciverUserID === this.state.ConversationUser.userID)
                        this.setState({ ConversationMessages: this.state.ConversationMessages.concat(mes) })
                });
            })
            .catch((err: any) => console.error(err.toString()));

        $.ajax({
            type: "GET",
            async: false,
            url: "https://localhost:44309/TetraAPI/GetUserDataByID",
            data: { ID: $("#ID").val() },
            success: (result: any) => {
                if (result === "NotFound") {
                    console.log("user not found: Get Data From Variables");
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
                    } as User;
                } else {
                    console.log("user found");
                    usr = result as User;
                }
            },
            error: (xhr) => {
                console.log("Server error: Get Data From Variables");
                console.log(xhr);
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
                } as User;
            },
        });
        $.ajax({
            type: "GET",
            async: false,
            url: "https://localhost:44309/TetraAPI/GetMessagesByID",
            data: { ID: usr.userID },
            success: (result: Message[]) => {
                mess = result;
            },
            error: (xhr) => {
                console.log(xhr);
            },
        });
        $.ajax({
            type: "GET",
            async: false,
            url: "https://localhost:44309/TetraAPI/GetUserConversationByID",
            data: { ID: usr.userID },
            success: (result: User[]) => {
                usrcon = result;
            },
            error: (xhr) => {
                console.log(xhr);
            },
        });
        this.state = {
            CurrentUser: usr,
            UserContacts: usrcon,
            Messages: mess,
            ConversationMessages: [] as Message[],
            ConversationUser: {} as User,
        };
    }
    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    SetCurrentUser: (usr: User) =>
                        this.setState({ CurrentUser: usr }),
                    SetContact: (usr: User) =>
                        this.setState({ ConversationUser: usr }),
                    AddMessage: (mes: Message) => {
                        this.connection
                            .invoke("SendMessage", mes)
                            .catch((err) => console.error(err.toString()));
                    },
                    SetMessages: (mess: Message[]) =>
                        this.setState({ ConversationMessages: mess }),
                    GetUsersByUserNameOrEMail: (usrnm: string | undefined) => {
                        var usrs = [] as User[];
                        $.ajax({
                            type: "GET",
                            async: false,
                            url:
                                "https://localhost:44309/TetraAPI/GetUsersByUserNameOrEMail",
                            data: { usrnm: usrnm },
                            success: (result: User[]) => {
                                usrs = result;
                            },
                            error: (xhr) => {
                                console.log(xhr);
                            },
                        });
                        return usrs;
                    },
                    AddUserToConversations: (usrnm: string) => {
                        var usr = {} as User;
                        $.ajax({
                            type: "GET",
                            async: false,
                            url:
                                "https://localhost:44309/TetraAPI/AddUserToConversationsByUserName",
                            data: {
                                usrnm: usrnm,
                                curusrnm: this.state.CurrentUser.userName,
                            },
                            success: (result: User) => {
                                usr = result;
                                this.setState({
                                    UserContacts: this.state.UserContacts.concat(
                                        usr
                                    ),
                                });
                            },
                            error: (xhr) => {
                                console.log(xhr);
                            },
                        });
                        return usr;
                    },
                    CreateGroup: (grp: SGroup) => {
                        this.connection.invoke("CreateGroup", grp);
                    },
                    AddMemberToGroup: (grp:SGroup , usr:User) => {
                        this.connection.invoke("AddMemberToGroup",grp,usr);
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
