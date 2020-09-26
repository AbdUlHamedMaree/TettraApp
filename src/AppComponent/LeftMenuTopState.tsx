import React, { Component } from "react";
import { ConversationUser, CurrentUser, SGroup } from "./Models";
import LeftMenuSingleContact from "./LeftMenuSingleContact";
import $ from "jquery";
import { MyContext } from "./AppProvider";

interface ILeftMenuTopStateProps {
    CurrentUser: CurrentUser;
}

interface ILeftMenuTopStateState {
    UserToAdd: ConversationUser[];
    UserNameToAdd: string[];
}

export default class LeftMenuTopState extends Component<
    ILeftMenuTopStateProps,
    ILeftMenuTopStateState
    > {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    OpenCloseEmojeForm = () => {
        let el = document.getElementById("LMTS_Menu")!;
        el.style.display = el.style.display === "block" ? "none" : "block";
    };

    CreateGroupButton = () => {
        document.getElementById("CreateGroupForm")!.style.display = "block";
        document.getElementById("LMTS_Menu")!.style.display = "none";
    };

    CloseGroupButton = () => {
        document.getElementById("CreateGroupForm")!.style.display = "none";
    };

    SearchNewUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            let usrnm = $(e.target).val()?.toString();
            let usrs = this.context.GetUsersByUserNameOrEMail(usrnm);
            this.setState({ UserToAdd: usrs });
        }
    };

    AddNewUserToGroup = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        for (let i = 0; i < (ev.target as HTMLElement).children.length; i++) {
            const el = (ev.target as HTMLElement).children[i];
            if (el.className === "LMC_UserName") {
                if (this.state.UserNameToAdd.indexOf($(el).text()?.toString()!) === -1)
                    this.setState({
                        UserNameToAdd: this.state.UserNameToAdd.concat(
                            $(el).text()?.toString()!
                        ),
                    });
                break;
            }
        }
    };

    DelUserFromGroup = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        this.setState({
            UserNameToAdd: this.state.UserNameToAdd.filter((value, index, array) => {
                return value !== (ev.target as HTMLLIElement).innerText ? (ev.target as HTMLLIElement).innerText : undefined;
            })
        })
    };


    CreateGroup = () => {
        let grp = {} as SGroup;
        grp.groupName = ($("#GroupName_Input_Text") as JQuery<HTMLInputElement>).text();
        grp.createTime = Date.now();
        grp.description = "this is my Group!";
        this.context.CreateGroup(grp);
    }
    constructor(props: ILeftMenuTopStateProps) {
        super(props);
        this.state = { UserToAdd: [] as ConversationUser[], UserNameToAdd: [] };
    }
    render() {
        return (
            <div className="LeftMenuTopState">
                <svg
                    id="Dots"
                    className="HoverEffect"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="10mm"
                    height="10mm"
                    viewBox="0 0 1000 1000"
                    onClick={this.OpenCloseEmojeForm}
                >
                    <path
                        name="dots"
                        d=" M 200 425C 241 425 275 459 275 500C 275 541 241 575 200 575C 159 575 125 541 125 500C 125 459 159 425 200 425C 200 425 200 425 200 425M 500 425C 541 425 575 459 575 500C 575 541 541 575 500 575C 459 575 425 541 425 500C 425 459 459 425 500 425C 500 425 500 425 500 425M 800 425C 841 425 875 459 875 500C 875 541 841 575 800 575C 759 575 725 541 725 500C 725 459 759 425 800 425C 800 425 800 425 800 425"
                        transform="rotate(90,500,500)"
                    ></path>
                </svg>

                <div id="LMTS_Menu">
                    <ul className="ULStyle">
                        <li onClick={this.CreateGroupButton}>Create A Group</li>
                        <li>Your Account</li>
                    </ul>
                </div>

                <div id="CreateGroupForm">
                    <button onClick={this.CloseGroupButton}>X</button>
                    <input type="submit" value="OK" onClick={this.CreateGroup} />
                    <input type="text" id="GroupName_Input_Text" placeholder="Group Name" />
                    <ul className="ULStyle">
                        {this.state.UserNameToAdd.map((usr) => (
                            <li className="ListHoverEffect" onClick={(e) => this.DelUserFromGroup(e)}>
                                {usr}
                            </li>
                        ))}
                    </ul>
                    <input
                        id="PopUpUserAdd_SearchBox"
                        type="search"
                        onKeyDown={(e) => this.SearchNewUser(e)}
                    />

                    <div id="PopUpUserAdd_UserList">
                        {this.state.UserToAdd.map((usr) => (
                            <div onClick={(e) => this.AddNewUserToGroup(e)}>
                                <LeftMenuSingleContact
                                    user={usr}
                                    setContact={()=>{}}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="LMTS_UserName">{this.props.CurrentUser.UserName}</div>

                <img
                    src={require("./../Images/Profile.jpg")}
                    alt="Profile"
                    width="50px"
                    height="50px"
                />
            </div>
        );
    }
}
