import React, { Component } from "react";
import { MyContext } from "./AppProvider";
import { ConversationUser } from "./Models";
import $ from "jquery";

interface ILeftMenuSingleContactProps {
    user: ConversationUser;
    setContact: ((usr: ConversationUser) => void) | (() => void)
}

interface ILeftMenuSingleContactState {
    user: ConversationUser
}

export default class LeftMenuSingleContact extends Component<
    ILeftMenuSingleContactProps,
    ILeftMenuSingleContactState
    > {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    constructor(props: ILeftMenuSingleContactProps) {
        super(props)
        this.state = { user: props.user }
    }

    static getDerivedStateFromProps(props: ILeftMenuSingleContactProps, state: ILeftMenuSingleContactState) {
        if (props !== state) {
            return {
                Message: props.user
            };
        }
        return null;
    }
    setConversation = () => {
        this.props.setContact(this.props.user);
        $(".RightConversation").css({ display: 'block' });
    };
    render() {
        return (
            <div
                className="LeftMenuSingleContact"
                onClick={() => this.setConversation()}
            >
                <div>
                    <img
                        className="LMC_Image"
                        src={require("../Images/Profile.jpg")}
                        width="50px"
                        height="50px"
                        alt="Profile"
                    />
                </div>
                <div className="LMC_UserName">
                    {this.props.user.ConversationName}
                </div>
                <div className="LMC_LastMessage">
                    {this.props.user.Messages === undefined ?
                        "" :
                        this.props.user.Messages![
                            this.props.user.Messages!.length - 1
                        ].content
                    }
                </div>
                <div className="LMC_LastSeen">
                    {this.props.user.LastSeen}
                </div>
            </div>
        );
    }
}
